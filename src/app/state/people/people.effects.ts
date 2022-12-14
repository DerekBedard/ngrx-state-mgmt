import { Injectable } from '@angular/core';
import {
  loadPeople,
  loadPeopleSuccess,
  loadPeopleFailure,
  updatePeople,
  updatePeopleSuccess,
  updatePeopleFailure
} from 'src/app/state/people/people.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, concatMap, tap } from 'rxjs/operators';
import { Person } from 'src/app/components/forms/person-form/person.model';
import { PeopleService } from 'src/app/services/people/people.service';

@Injectable()
export class PeopleEffects {
  constructor(
    private actions$: Actions,
    private _people: PeopleService
  ) {}

  // Run this code when a loadPeople action is dispatched
  loadPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPeople),
      switchMap(() =>
        // Call mock get request, convert it to an observable
        from(this._people.mockPeopleGetRequest()).pipe(
          // tap((people: { [key: string]: Person })  => console.log("load tap log: ", people)),
          // If value returned, dispatch a success action
          map((people: { [key: string]: Person }) => loadPeopleSuccess({ people })),
          // If error returned, dispatched a failure action
          catchError((error: string) => of(loadPeopleFailure({ error })))
        )
      )
    )
  );

  // Run this code when an updatePeople action is dispatched
  updatePeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePeople),
      concatMap((action) =>
        // Call mock put request, convert it to an observable
        from(this._people.mockPeoplePutRequest(action.nextPerson, action.delKeys, action.addKeys)).pipe(
          // tap((people: { [key: string]: Person })  => console.log("update tap log: ", people)),
          // If value returned, dispatch a success action
          map((people: { [key: string]: Person }) => updatePeopleSuccess({ people })),
          // If error returned, dispatched a failure action
          catchError((error: string) => of(updatePeopleFailure({ error })))
        )
      )
    )
  );
}
