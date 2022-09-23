import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FriendFormService {
  constructor() {}

  getFriendPlaceholder(i: number): string {
    if (i === 0) {
      return "A friend's name";
    } else if (i === 4) {
      return "Final friend's name";
    } else {
      return "Another friend's name";
    }
  }

  disableAddFriendBtn(friends: string[], friendsFG: any): Boolean {
    if (friends.length > 0) {
      let hasVal = friendsFG.controls[friends[friends.length - 1]].value;
      let hasErr =
        friendsFG.controls[friends[friends.length - 1]].hasError('pattern');
      if (hasVal && !hasErr) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }
}
