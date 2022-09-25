import { Injectable } from '@angular/core';
import { Person } from 'src/app/components/forms/person-form/person.model';
import * as unparsedJson from '../../../../assets/people-on-load.json';

@Injectable({
  providedIn: 'root',
})
export class PersonFormService {
  people: { [key: string]: Person }  = {};
  
  constructor() {}

  async mockPeopleGetRequest(): Promise<{ [key: string]: Person}> {
    let parsedJson = JSON.parse(JSON.stringify(unparsedJson));
    this.people = parsedJson.people;
    return this.people;
  }

  async mockPeoplePutRequest(currPerson: Person, nextPerson: Person): Promise<{ [key: string]: Person}> {
    console.log("currPerson: ", currPerson);
    console.log("nextPerson: ", nextPerson);
    return this.people;
  }

}
