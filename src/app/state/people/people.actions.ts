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

// export const updatePerson = createAction(
//     "Trigger Person update",
//     props<{ person: Person }>()
// );

// export const updatePersonSuccess = createAction(
//     "Successful Person Update",
//     props<{ person: Person }>()
// );

// export const updatePersonFailure = createAction(
//     "Failed Person Update",
//     props<{ error: string }>()
// );
