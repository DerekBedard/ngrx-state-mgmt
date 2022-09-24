import { Injectable } from '@angular/core';
import {
  loadPeople,
  loadPeopleSuccess,
  loadPeopleFailure,
  // updatePerson,
  // updatePersonSuccess,
  // updatePersonFailure
} from 'src/app/state/people/people.actions';
import { PersonFormService } from 'src/app/components/forms/person-form/person-form.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectPeople } from './people.selectors';
import { AppState } from '../app.state';
import { Person } from 'src/app/components/forms/person-form/person.model';

@Injectable()
export class PeopleEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private personFormService: PersonFormService
  ) {}

  // Run this code when a loadPeople action is dispatched
  loadPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPeople),
      switchMap(() =>
        // Call mock get request, convert it to an observable
        from(this.personFormService.mockPeopleGetRequest()).pipe(
          tap((people: Person[])  => console.log("tap log: ", people)),
          // If value returned, dispatch a success action
          map((people: Person[]) => loadPeopleSuccess({ people })),
          // If error returned, dispatched a failure action
          catchError((error: string) => of(loadPeopleFailure({ error })))
        )
      )
    )
  );

  // Run this code when an updatePerson action is dispatched
  // updateNetwork$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(updatePerson),
  //     switchMap((action) =>
        // Create Observable from service method return value
  //       from(this.httpRequestService.mockPutRequest(action.person)).pipe(
  //         // If PUT request success:
  //         map((person) => updatePersonSuccess({ person })),
  //         // If PUT request fail:
  //         catchError((error) => of(updatePersonFailure({ error })))
  //       )
  //     )
  //   )
  // );
}
