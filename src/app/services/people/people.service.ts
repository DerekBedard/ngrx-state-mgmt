import { Injectable } from '@angular/core';
import { Person } from 'src/app/components/forms/person-form/person.model';
import * as unparsedJson from '../../../assets/people-on-load.json';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  people: { [key: string]: Person }  = {};
  
  constructor() {}

  async mockPeopleGetRequest(): Promise<{ [key: string]: Person}> {
    let parsedJson = JSON.parse(JSON.stringify(unparsedJson));
    if (Object.keys(this.people).length === 0) {
      this.people = parsedJson.people;
    }
    return this.people;
  }

  async mockPeoplePutRequest(nextPerson: Person): Promise<{ [key: string]: Person}> {
    let clone = JSON.parse(JSON.stringify(this.people));
    clone[nextPerson.id] = nextPerson;
    for (const key in clone) {
      if (key !== nextPerson.id) {
        if (nextPerson.friends[key] && !clone[key].friends[nextPerson.id]) {
          clone[key].friends[nextPerson.id] = true;
        } else if (!nextPerson.friends[key] && clone[key].friends[nextPerson.id]) {
          delete clone[key].friends[nextPerson.id];
        }
      }
    }
    this.people = clone;
    return this.people;
  }

}
