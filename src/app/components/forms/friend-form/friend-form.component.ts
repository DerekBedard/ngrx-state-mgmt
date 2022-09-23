import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FriendFormService } from './services/friend-form.service';

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
  friends: string[] = []; // form control key names for friend fields
  friendCount: number = 0;

  constructor(
    private fb: FormBuilder,
    public friendFormService: FriendFormService
  ) {}

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
    this.friendCount--;
    let controlKey = this.friends.pop();
    this.friendForm.removeControl(controlKey);
  }

  onSubmit(): void {
    alert('Submitted!');
  }
}
