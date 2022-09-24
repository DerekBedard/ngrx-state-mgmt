import { Person } from '../../components/forms/person-form/person.model';
import { createReducer, on } from '@ngrx/store';
import {
  loadPeople,
  loadPeopleSuccess,
  loadPeopleFailure,
  // updatePerson,
  // updatePersonSuccess,
} from './people.actions';
import { state } from '@angular/animations';

export interface PeopleState {
  people: Person[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: PeopleState = {
  people: [],
  error: null,
  status: 'pending',
};

export const peopleReducer = createReducer(
  // Supply the initial state:
  initialState,
  // Update state to reflect data retrieval in progress status:
  on(loadPeople, (state) => ({
    ...state,
    status: 'loading'
  })),
  // Handle load success
  on(loadPeopleSuccess, (state, { people }) => ({
    ...state,
    people: people,
    error: null,
    status: 'success',
  })),
  // Handle load failure
  on(loadPeopleFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  }))
  // on(updatePerson, (state, { person }) => ({ ...state, status: 'loading' })),
  // on(updatePersonSuccess, (state, { person }) => ({
  //   ...state,
  //   people: state.people.map((obj) => {
  //     if (obj.id == person.id) {
  //       return person;
  //     }
  //     return obj;
  //   }),
  //   error: null,
  //   status: 'success',
  // }))
);
