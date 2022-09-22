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
        Validators.pattern("^[a-z A-Z]+$")
      ])
    ],
    weight: [
      null,
      Validators.compose([
        Validators.required,
        Validators.min(50),
        Validators.max(1000)
      ])
    ],
    age: [
      null,
      Validators.compose([
        Validators.required,
        Validators.min(18),
        Validators.max(150)
      ])
    ]
  });
  friends: any[] = [];

  constructor(private fb: FormBuilder) {}

  friendCount: number = 0;
  addFriend(): void {
    this.friendCount++;
    this.friendForm = this.fb.group({
      ...this.friendForm.controls,
      ['friend' + this.friendCount.toString()]: [null, Validators.pattern("^[a-z A-Z]+$")]
    });
    this.friends.push({ id: 'friend' + this.friendCount.toString() });
  }

  getFriendPlaceholder(i: number): string {
    if (i === 0) {
      console.log("i: ", i, typeof i);
      return "A friend's name";
    } else {
      console.log("i: ", i, typeof i);
      return "Another friend's name";
    }
  }

  onSubmit(): void {
    alert('Submitted!');
  }
}
