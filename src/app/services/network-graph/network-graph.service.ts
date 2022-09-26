import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkGraphService {
  private nodeMouseOver$: BehaviorSubject<any>;
  private nodeMouseOut$: BehaviorSubject<Boolean>;

  constructor() {
    this.nodeMouseOver$ = new BehaviorSubject<any>(null);
    this.nodeMouseOut$ = new BehaviorSubject<any>(false);
  }

  nodeMouseOverStream(): Observable<any> {
    return this.nodeMouseOver$.asObservable();
  }

  nodeMouseOutStream(): Observable<null | Boolean> {
    return this.nodeMouseOut$.asObservable();
  }

  nodeMouseOver(event: any, d: any): void {
    this.nodeMouseOver$.next({ event: event, d: d});
  }

  nodeMouseOut(): void {
    this.nodeMouseOut$.next(false);
  }
}
