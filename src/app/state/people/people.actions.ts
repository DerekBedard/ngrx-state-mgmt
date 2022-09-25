import { createAction, props } from "@ngrx/store";
import { Person } from "../../components/forms/person-form/person.model";

export const loadPeople = createAction(
    "Attempt People load"
);

export const loadPeopleSuccess = createAction(
    "Successful People load",
    props<{ people: Person[] }>()
)

export const loadPeopleFailure = createAction(
    "Failed People load",
    props<{ error: string }>()
)

export const updatePeople = createAction(
    "Attempt People update",
    props<{ currPerson: Person, nextPerson: Person }>()
);

export const updatePeopleSuccess = createAction(
    "Successful People update",
    props<{ people: Person[] }>()
)

export const updatePeopleFailure = createAction(
    "Failed People update",
    props<{ error: string }>()
)
