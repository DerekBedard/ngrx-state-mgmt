import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FriendFormService {

  constructor() { }

  getFriendPlaceholder(i: number): string {
    if (i === 0) {
      return "A friend's name";
    } else {
      return "Another friend's name";
    }
  }
  
}
