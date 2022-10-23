import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from "@ngrx/store";
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { loadPeople, updatePeople } from 'src/app/state/people/people.actions';
import { selectPeople } from "src/app/state/people/people.selectors";
import { Person } from './person.model';

@Injectable()
export class UnsubscribeService implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  destroy(): Observable<void> {
    return this.destroy$.asObservable();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  providers: [UnsubscribeService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class personFormComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm | undefined;
  public people$ = this.store.select(selectPeople);
  people: { [key: string]: Person } = {};
  selectedPerson: Person = {
    id: "",
    name: "",
    weight: null,
    age: null,
    friends: {}
  };
  delKeys: string[] = [];
  addKeys: string[] = [];
  personUpdateFormGroup: any = this.fb.group({
    name: [
      null,
      Validators.required
    ],
    weight: [
      null,
      Validators.compose([
        Validators.required,
        Validators.min(50),
        Validators.max(1000),
      ]),
    ],
    age: [
      null,
      Validators.compose([
        Validators.required,
        Validators.min(18),
        Validators.max(150),
      ]),
    ],
    friends: [
      null
    ]
  });
  showErrMsg: Boolean = false;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog,
    private _unsubscribe: UnsubscribeService
  ) {}

  ngOnInit() {
    this.store.dispatch(loadPeople());
    this.formValChangesSubscribe();
    this.peopleSubscribe();
  }

  formValChangesSubscribe(): void {
    this.personUpdateFormGroup.valueChanges
    .pipe(takeUntil(this._unsubscribe.destroy()))
    .subscribe(() => {
      if (this.personUpdateFormGroup.valid) {
        this.showErrMsg = false;
      }
    });
    this.personUpdateFormGroup.get('name').valueChanges
    .pipe(takeUntil(this._unsubscribe.destroy()))
    .subscribe((val: { id: string, name: string }) => {
      if (val) {
        this.selectedPerson = this.people[val.id];
        this.personUpdateFormGroup.controls['weight'].setValue(this.selectedPerson.weight);
        this.personUpdateFormGroup.controls['age'].setValue(this.selectedPerson.age);
        this.updateDOM();
        this.personUpdateFormGroup.controls['friends'].setValue(Object.keys(this.selectedPerson.friends));
      } else if (val === undefined) {
        this.clearForm();
      }
    });
  }

  peopleSubscribe(): void {
    this.people$
    .pipe(takeUntil(this._unsubscribe.destroy()))
    .subscribe((people: { [key: string]: Person }) => {
      this.people = people;
    })
  }

  onSubmit(): void {
    if (this.personUpdateFormGroup.pristine ||
      this.personUpdateFormGroup.untouched ||
      !this.personUpdateFormGroup.valid) {
      this.showErrMsg = true;
    } else {
      for (const key in this.selectedPerson.friends) {
        if (!this.personUpdateFormGroup.controls['friends'].value.includes(key)) {
          this.delKeys.push(key);
        }
      }
      for (let i=0; i<this.personUpdateFormGroup.controls['friends'].value.length; i++) {
        if (!this.selectedPerson.friends[this.personUpdateFormGroup.controls['friends'].value[i]]) {
          this.addKeys.push(this.personUpdateFormGroup.controls['friends'].value[i]);
        }
      }
      let newFriendsObjFromArr: { [key: string]: Boolean} = this.personUpdateFormGroup.controls['friends'].value.reduce((acc: any,curr:any)=> (acc[curr]=true,acc),{});
      let nextPerson: Person = {
        ...this.personUpdateFormGroup.value,
        id: this.selectedPerson?.id,
        name: this.personUpdateFormGroup.controls['name'].value.name,
        friends: newFriendsObjFromArr
      }
      let delKeys = this.delKeys;
      let addKeys = this.addKeys;
      this.store.dispatch(updatePeople({ nextPerson, delKeys, addKeys }));
      this.clearForm();
      this.validationSuccessModal();
    }
  }

  clearForm(): void {
    this.personUpdateFormGroup.reset();
    this.delKeys = [];
    this.addKeys = [];
    setTimeout(() => {
      this.formDirective? this.formDirective.resetForm() : null;
    }, 1)
  }

  updateDOM(): void {
    this.changeDetector.detectChanges();
  }

  validationSuccessModal(): void {
    this.dialog.open(ValidationSuccessModal, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms'
    });
  }

}

// This Component is for creating a modal following successful form validation
@Component({
  selector: 'validation-success-modal',
  templateUrl: 'dialog-modals/validation-success-modal.html',
  styleUrls: ['dialog-modals/validation-success-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationSuccessModal {
  constructor(public dialogRef: MatDialogRef<ValidationSuccessModal>) {}
}
