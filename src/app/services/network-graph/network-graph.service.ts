import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkGraphService implements OnDestroy {
  private nodeMouseOver$: Subject<any> = new Subject<any>();
  private nodeMouseOut$: Subject<Boolean> = new Subject<any>();

  constructor() {}

  nodeMouseOverStream(): Observable<any> {
    return this.nodeMouseOver$.asObservable();
  }

  nodeMouseOutStream(): Observable<Boolean> {
    return this.nodeMouseOut$.asObservable();
  }

  nodeMouseOver(event: any, d: any): void {
    this.nodeMouseOver$.next({ event: event, d: d});
  }

  nodeMouseOut(): void {
    this.nodeMouseOut$.next(false);
  }

  ngOnDestroy(): void {
    this.nodeMouseOver$.complete();
    this.nodeMouseOut$.complete();
  }
}
