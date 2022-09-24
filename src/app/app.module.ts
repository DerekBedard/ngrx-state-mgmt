import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { personFormComponent } from './components/forms/person-form/person-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NameFieldComponent } from './components/fields/name-field/name-field.component';
import { NumberFieldComponent } from './components/fields/number-field/number-field.component';
import { NetworkGraphComponent } from './components/data-visualizations/network-graph/network-graph.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PeopleEffects } from './state/people/people.effects';
import { peopleReducer } from './state/people/people.reducer';

@NgModule({
  declarations: [
    AppComponent,
    personFormComponent,
    NameFieldComponent,
    NumberFieldComponent,
    NetworkGraphComponent
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
    ReactiveFormsModule,
    StoreModule.forRoot({ peopleState: peopleReducer }),
    EffectsModule.forRoot([PeopleEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
