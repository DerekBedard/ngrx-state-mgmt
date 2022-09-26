import { Person } from '../../components/forms/person-form/person.model';
import { createReducer, on } from '@ngrx/store';
import {
  loadPeople,
  loadPeopleSuccess,
  loadPeopleFailure,
  updatePeople,
  updatePeopleSuccess,
  updatePeopleFailure,
} from './people.actions';

export interface PeopleState {
  // people: Person[];
  people: { [key: string]: Person }
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: PeopleState = {
  people: {},
  error: null,
  status: 'pending',
};

export const peopleReducer = createReducer(
  // Supply the initial state:
  initialState,
  // Update state status to reflect data retrieval or update in progress:
  on(loadPeople, updatePeople, (state) => ({
    ...state,
    status: 'loading'
  })),
  // Handle load or update success
  on(loadPeopleSuccess, updatePeopleSuccess, (state, { people }) => ({
    ...state,
    people: people,
    error: null,
    status: 'success',
  })),
  // Handle load or update failure
  on(loadPeopleFailure, updatePeopleFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  }))
);
