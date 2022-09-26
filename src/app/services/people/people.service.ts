import { Injectable } from '@angular/core';
import { Person } from 'src/app/components/forms/person-form/person.model';
import * as unparsedJson from '../../../assets/people-on-load.json';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  people: { [key: string]: Person } = {};

  constructor() {}

  async mockPeopleGetRequest(): Promise<{ [key: string]: Person }> {
    let parsedJson = JSON.parse(JSON.stringify(unparsedJson));
    if (Object.keys(this.people).length === 0) {
      this.people = parsedJson.people;
    }
    return this.people;
  }

  async mockPeoplePutRequest(
    nextPerson: Person,
    delKeys: string[],
    addKeys: string[]
  ): Promise<{ [key: string]: Person }> {
    let peopleClone = JSON.parse(JSON.stringify(this.people));
    peopleClone[nextPerson.id] = nextPerson;
    for (let i = 0; i < delKeys.length; i++) {
      delete peopleClone[delKeys[i]].friends[nextPerson.id];
    }
    for (let i = 0; i < addKeys.length; i++) {
      peopleClone[addKeys[i]].friends[nextPerson.id] = true;
    }
    this.people = peopleClone;
    return this.people;
  }
}
