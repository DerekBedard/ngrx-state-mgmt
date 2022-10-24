import * as Actions from './people.actions';
import { Person } from '../../components/forms/person-form/person.model';

describe('Store > Actions', () => {
  it('should create a loadPeople action', () => {
    const action: any = Actions.loadPeople();
    expect(action.type).toEqual('Attempt People load');
  });

  it('should create a loadPeopleSuccess action containing a payload', () => {
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
          }
    };
    const action = Actions.loadPeopleSuccess({people: people});

    expect({ ...action }).toEqual({
        type: "Successful People load",
        people: people
    });
  });

});
