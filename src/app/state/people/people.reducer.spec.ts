import * as fromReducer from './people.reducer';
import * as fromActions from './people.actions';
import { Person } from 'src/app/components/forms/person-form/person.model';

describe('Store > Reducers', () => {
  afterEach(() => {
    fromReducer.initialState.people = {};
  });

  it('should return the default/initial state', () => {
    const { initialState } = fromReducer;
    const state = fromReducer.peopleReducer(undefined, { type: "" });

    expect(state).toBe(initialState);
  });

  it('should load data', () => {
    const { initialState } = fromReducer;
    const people: { [key: string]: Person } = {
        1: {
            id: "1",
            name: "Red Ranger",
            weight: 240,
            age: 23,
            friends: {
              2: true,
              4: true
            },
            nodeColor: "red"
          },
    };
    const action = fromActions.loadPeopleSuccess({people: people});
    const state = fromReducer.peopleReducer(initialState, action);

    expect(state.people).toEqual(people);
  });
});