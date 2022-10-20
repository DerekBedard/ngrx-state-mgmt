import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { PeopleEffects } from './people.effects';
import { PeopleService } from 'src/app/services/people/people.service';
import { Person } from 'src/app/components/forms/person-form/person.model';

describe('Store > Data > PeopleEffects', () => {
  let store: MockStore;
  const initialState = {};
  let actions$: Observable<Action>;
  let effects: PeopleEffects;
  let peopleService: PeopleService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        PeopleEffects,
        PeopleService
      ],
    });
    store = TestBed.inject(MockStore);
    effects = TestBed.inject(PeopleEffects);
    peopleService = TestBed.inject(PeopleService);
  }));

  it('should dispatch loadPeopleSuccess Action after successfully completing tasks in response to loadPeople Action', (done) => {
    const people: { [key: string]: Person } = {
      1: {
        id: '1',
        name: 'Red Ranger',
        weight: 240,
        age: 23,
        friends: {
          2: true,
          4: true,
        },
      },
    };
    
    spyOn(peopleService, 'mockPeopleGetRequest').and.returnValue(
      Promise.resolve(people)
    );
    let promiseResolveSuccess: Boolean | undefined;

    actions$ = of({ type: 'Attempt People load' });

    peopleService.mockPeopleGetRequest()
      .then((people: { [key: string]: Person }) => {
        promiseResolveSuccess = true;
      })
      .catch(() => {
        promiseResolveSuccess = false;
      });

    effects.loadPeople$.subscribe((action) => {
      if (promiseResolveSuccess) {
        expect(action.type).toBe('Successful People load');
        expect({ ...action }).toEqual({
          type: 'Successful People load',
          people: people,
        });
        done();
      }
    });

  });

});
