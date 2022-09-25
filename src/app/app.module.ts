import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { personFormComponent, ValidationSuccessModal } from './components/forms/person-form/person-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from './components/fields/text-field/text-field.component';
import { NumberFieldComponent } from './components/fields/number-field/number-field.component';
import { NetworkGraphComponent } from './components/data-visualizations/network-graph/network-graph.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PeopleEffects } from './state/people/people.effects';
import { peopleReducer } from './state/people/people.reducer';
import { PeopleService } from './services/people/people.service';

@NgModule({
  declarations: [
    AppComponent,
    personFormComponent,
    TextFieldComponent,
    NumberFieldComponent,
    NetworkGraphComponent,
    ValidationSuccessModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ peopleState: peopleReducer }),
    EffectsModule.forRoot([PeopleEffects])
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
