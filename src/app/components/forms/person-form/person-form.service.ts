import { Injectable } from '@angular/core';
import { Person } from 'src/app/components/forms/person-form/person.model';
import * as unparsedJson from '../../../../assets/people-on-load.json';

@Injectable({
  providedIn: 'root',
})
export class PersonFormService {
  people: Person[] = [];
  
  constructor() {}

  async mockPeopleGetRequest(): Promise<Person[]> {
    let parsedJson = JSON.parse(JSON.stringify(unparsedJson));
    this.people = parsedJson.people;
    console.log("service log: ", this.people, typeof this.people);
    return this.people;
  }

  // mockPersonPutRequest(person: Person): Person {
  //   for (let i = 0; i < this.people.length; i++) {
  //     if (this.people[i].id === person.id) {
  //       this.people[i] = person;
  //     }
  //   }
  //   return person;
  // }

  getFriendPlaceholder(i: number): string {
    if (i === 0) {
      return "A friend's name";
    } else if (i === 4) {
      return "Final friend's name";
    } else {
      return "Another friend's name";
    }
  }

  disableAddFriendBtn(friendControlKeys: string[], friendsFG: any): Boolean {
    if (friendControlKeys.length > 0) {
      let hasVal = friendsFG.controls[friendControlKeys[friendControlKeys.length - 1]].value;
      let hasErr =
        friendsFG.controls[friendControlKeys[friendControlKeys.length - 1]].hasError('pattern');
      if (hasVal && !hasErr) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }
}
