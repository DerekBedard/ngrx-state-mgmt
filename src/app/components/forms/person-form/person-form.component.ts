import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from "@ngrx/store";
import { AppState } from 'src/app/state/app.state';
import { loadPeople, updatePeople } from 'src/app/state/people/people.actions';
import { selectPeople } from "src/app/state/people/people.selectors";
import { Person } from './person.model';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
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
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.store.dispatch(loadPeople());
    this.startSubscriptions();
  }

  startSubscriptions(): void {
    this.subscribeToFormValChanges();
    this.subscribeToPeopleStateChanges();
  }

  subscribeToFormValChanges(): void {
    this.personUpdateFormGroup.valueChanges.subscribe(() => {
      if (this.personUpdateFormGroup.valid) {
        this.showErrMsg = false;
      }
    });
    this.personUpdateFormGroup.get('name').valueChanges.subscribe((val: { id: string, name: string }) => {
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

  subscribeToPeopleStateChanges(): void {
    this.people$.subscribe((people: { [key: string]: Person }) => {
      this.people = people;
    })
  }

  onSubmit(): void {
    if (this.personUpdateFormGroup.pristine ||
      this.personUpdateFormGroup.untouched ||
      !this.personUpdateFormGroup.valid) {
      this.showErrMsg = true;
    } else {
      let currPerson: Person = this.selectedPerson;
      let newFriendsObjFromArr: { [key: string]: Boolean} = this.personUpdateFormGroup.controls['friends'].value.reduce((acc: any,curr:any)=> (acc[curr]=true,acc),{});
      let nextPerson: Person = {
        ...this.personUpdateFormGroup.value,
        id: this.selectedPerson?.id,
        name: this.personUpdateFormGroup.controls['name'].value.name,
        friends: newFriendsObjFromArr
      }
      this.clearForm();
      this.validationSuccessModal();
      this.store.dispatch(updatePeople({ currPerson, nextPerson }));
    }
  }

  clearForm(): void {
    this.personUpdateFormGroup.reset();
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
})
export class ValidationSuccessModal {
  constructor(public dialogRef: MatDialogRef<ValidationSuccessModal>) {}
}
