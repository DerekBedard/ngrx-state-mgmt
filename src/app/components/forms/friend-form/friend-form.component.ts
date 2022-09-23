import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FriendFormService } from './services/friend-form.service';

@Component({
  selector: 'app-friend-form',
  templateUrl: './friend-form.component.html',
  styleUrls: ['./friend-form.component.scss'],
})
export class FriendFormComponent implements OnInit {
  people: any = {};
  person: any = this.fb.group({
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
    private fb: FormBuilder,
    public friendFormService: FriendFormService
  ) {}

  ngOnInit() {
    this.subscribeToFormValChanges();
  }

  subscribeToFormValChanges(): void {
    this.person.valueChanges.subscribe(() => {
      if (this.person.valid) {
        this.showErrMsg = false;
      }
    });
  }

  addFriendField(): void {
    this.friendCount++;
    this.person = this.fb.group({
      ...this.person.controls,
      friends: this.fb.group({
        ...this.person.controls['friends'].controls,
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
    this.person.controls['friends'].removeControl(controlKey);
  }

  onSubmit(): void {
    this.person.markAllAsTouched();
    if (this.person.valid) {
      console.log("Validation passed!");
      console.log("this.person.value: ", this.person.value);
    } else {
      this.showErrMsg = true;
    }
  }
}
