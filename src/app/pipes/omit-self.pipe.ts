import {Pipe, PipeTransform} from "@angular/core";
import { Person } from "../components/forms/person-form/person.model";

@Pipe({
    name: "omitSelf"
})

export class OmitSelf implements PipeTransform {
    transform(people: Person[] | null, omitName: string) {
        if (!people) {
            return [];
        }
        people = people.filter(person => person.name !== omitName);
        return people; 
    }
}