import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { PeopleState } from "./people.reducer";

export const selectPeopleState = (state: AppState) => state.peopleState;
export const selectPeople = createSelector(
    selectPeopleState,
    (state: PeopleState) => state.people
);
export const selectPeopleLoadStatus = createSelector(
    selectPeopleState,
    (state: PeopleState) => state.status
);