import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FriendFormService } from './services/friend-form.service';

@Component({
  selector: 'app-friend-form',
  templateUrl: './friend-form.component.html',
  styleUrls: ['./friend-form.component.scss'],
})
export class FriendFormComponent {
  personFG: any = this.fb.group({
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
    friendsFG: this.fb.group({}),
  });
  friendControlKeys: string[] = []; // form control key names for friend fields
  friendCount: number = 0;

  constructor(
    private fb: FormBuilder,
    public friendFormService: FriendFormService
  ) {}

  addFriendField(): void {
    this.friendCount++;
    this.personFG = this.fb.group({
      ...this.personFG.controls,
      friendsFG: this.fb.group({
        ...this.personFG.controls['friendsFG'].controls,
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
    this.personFG.controls['friendsFG'].removeControl(controlKey);
  }

  onSubmit(): void {
    alert('Submitted!');
  }
}
