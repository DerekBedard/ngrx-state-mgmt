import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NetworkGraphComponent } from './network-graph.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('NetworkGraphComponent', () => {
  let component: NetworkGraphComponent;
  let fixture: ComponentFixture<NetworkGraphComponent>;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkGraphComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(NetworkGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
