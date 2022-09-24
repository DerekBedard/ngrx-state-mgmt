import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { AppState } from 'src/app/state/app.state';
import { loadPeople } from 'src/app/state/people/people.actions';
import { selectPeople } from "src/app/state/people/people.selectors";
import { Person } from './person.model';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class personFormComponent implements OnInit {
  public people$ = this.store.select(selectPeople);
  people: Person[] = [];
  // personAddFormGroup: any = this.fb.group({
  //   name: [
  //     null,
  //     Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^[a-z A-Z]+$'),
  //     ]),
  //   ],
  // }); 
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
    ]
  });
  showErrMsg: Boolean = false;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
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
    this.personUpdateFormGroup.valueChanges.subscribe((val: any) => {
      if (this.personUpdateFormGroup.valid) {
        this.showErrMsg = false;
      }
    });
    this.personUpdateFormGroup.get('name').valueChanges.subscribe((name: string) => {
      if (name) {
        let person: Person = (this.people.filter(person => person.name === name))[0];
        this.personUpdateFormGroup.controls['weight'].setValue(person.weight);
        this.personUpdateFormGroup.controls['age'].setValue(person.age);
      } else if (name === undefined) {
        this.personUpdateFormGroup.controls['name'].setValue(null);
        this.personUpdateFormGroup.controls['weight'].setValue(null);
        this.personUpdateFormGroup.controls['age'].setValue(null);
      }
    });
  }

  subscribeToPeopleStateChanges(): void {
    this.people$.subscribe((people: Person[]) => {
      this.people = people;
    })
  }

  onSubmit(): void {
    this.personUpdateFormGroup.markAllAsTouched();
    if (this.personUpdateFormGroup.valid) {
      console.log("Validation passed: ", this.personUpdateFormGroup.value);
    } else {
      this.showErrMsg = true;
    }
  }

}
