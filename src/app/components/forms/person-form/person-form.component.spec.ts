import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { personFormComponent } from './person-form.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('personFormComponent', () => {
  let component: personFormComponent;
  let fixture: ComponentFixture<personFormComponent>;
  let store: MockStore;
  const initialState = {};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ personFormComponent ],
      providers: [
        provideMockStore({ initialState }),
      ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(personFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
