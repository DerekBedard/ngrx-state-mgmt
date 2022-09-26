import * as selectors from './people.selectors';
import { AppState } from '../app.state';
import { PeopleState } from './people.reducer';

const createPeopleState = (): PeopleState => ({
  people: {},
  error: null,
  status: 'pending',
});

const createAppState = (): AppState => ({
  peopleState: createPeopleState(),
});

describe('Store > Selectors', () => {
  it('selectPeopleState should return peopleState from the AppState', () => {
    const state = createAppState();
    expect(selectors.selectPeopleState(state)).toBe(state.peopleState);
  });
});
