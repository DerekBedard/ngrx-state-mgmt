import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { AppState } from 'src/app/state/app.state';
import { loadPeople } from 'src/app/state/people/people.actions';
import { selectPeople } from "src/app/state/people/people.selectors";
import { PersonFormService } from './person-form.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class personFormComponent implements OnInit {
  public people$ = this.store.select(selectPeople);
  personFormGroup: any = this.fb.group({
    name: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z A-Z]+$'),
      ]),
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
    friends: this.fb.group({}),
  });
  friendControlKeys: string[] = []; // form control key names for friend fields
  friendCount: number = 0;
  showErrMsg: Boolean = false;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    public PersonFormService: PersonFormService
  ) {}

  ngOnInit() {
    this.store.dispatch(loadPeople());
    this.subscribeToFormValChanges();
  }

  // updatePerson(person: Person): void {
  //   this.store.dispatch(updatePerson({ person }))
  // }

  subscribeToFormValChanges(): void {
    this.personFormGroup.valueChanges.subscribe(() => {
      if (this.personFormGroup.valid) {
        this.showErrMsg = false;
      }
    });
  }

  addFriendField(): void {
    this.friendCount++;
    this.personFormGroup = this.fb.group({
      ...this.personFormGroup.controls,
      friends: this.fb.group({
        ...this.personFormGroup.controls['friends'].controls,
        ['friend' + this.friendCount.toString()]: [
          null,
          Validators.pattern('^[a-z A-Z]+$'),
        ],
      }),
    });
    this.friendControlKeys.push('friend' + this.friendCount.toString());
  }

  deleteFriendField(): void {
    this.friendCount--;
    let controlKey = this.friendControlKeys.pop();
    this.personFormGroup.controls['friends'].removeControl(controlKey);
  }

  onSubmit(): void {
    this.personFormGroup.markAllAsTouched();
    if (this.personFormGroup.valid) {
      console.log("Validation passed!");
      console.log("this.personFormGroup.value: ", this.personFormGroup.value);
    } else {
      this.showErrMsg = true;
    }
  }

}
