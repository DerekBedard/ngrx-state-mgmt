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
    this.people = parsedJson.people;
    return this.people;
  }

  async mockPeoplePutRequest(currPerson: Person, nextPerson: Person): Promise<{ [key: string]: Person}> {
    // for (const key in this.people) {
    //   if (nextPerson.id === key) {
    //     this.people[key] = nextPerson;
    //   }
    // }
    console.log("currPerson: ", currPerson);
    console.log("nextPerson: ", nextPerson);
    console.log("nextPerson.id: ", nextPerson.id, typeof nextPerson.id);
    console.log("this.people[nextPerson.id] BEFORE: ", this.people[nextPerson.id]);
    // this.people[nextPerson.id] = nextPerson;
    console.log("this.people[nextPerson.id] AFTER: ", this.people[nextPerson.id]);
    console.log("return - this.people: ", this.people);
    return this.people;
  }

}
