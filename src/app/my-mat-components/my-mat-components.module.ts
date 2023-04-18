import { NgModule } from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule
  ]
})
export class MyMatComponentsModule { }
