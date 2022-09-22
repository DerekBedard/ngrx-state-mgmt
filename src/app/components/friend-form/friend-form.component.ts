import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-friend-form',
  templateUrl: './friend-form.component.html',
  styleUrls: ['./friend-form.component.scss'],
})
export class FriendFormComponent {
  friendForm: any = this.fb.group({
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
  });
  friends: any[] = []; // form control keys

  constructor(private fb: FormBuilder) {}

  friendCount: number = 0;
  addFriend(): void {
    this.friendCount++;
    this.friendForm = this.fb.group({
      ...this.friendForm.controls,
      ['friend' + this.friendCount.toString()]: [
        null,
        Validators.pattern('^[a-z A-Z]+$'),
      ],
    });
    this.friends.push('friend' + this.friendCount.toString());
  }

  disableAddFriend(): Boolean {
    if (this.friends.length > 0) {
      let hasVal = this.friendForm.controls[this.friends[this.friends.length - 1]].value;
      let hasErr = this.friendForm.controls[this.friends[this.friends.length - 1]].hasError('pattern');
      if (hasVal && !hasErr) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  deleteFriend(): void {
    let controlKey = this.friends.pop();
    this.friendForm.removeControl(controlKey);
  }

  getFriendPlaceholder(i: number): string {
    if (i === 0) {
      return "A friend's name";
    } else {
      return "Another friend's name";
    }
  }

  onSubmit(): void {
    alert('Submitted!');
  }
}
