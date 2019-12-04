import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { PersonpostComponent } from './personpost/personpost.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { AppErrorHandler } from 'src/app/Common/app-error-handler';
import { AreYouSureDirective } from './Common/are-you-sure.directive';
import { PersonAddComponent } from './person-add/person-add.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PersonpostComponent,
    BsNavbarComponent,
    HomeComponent,
    AreYouSureDirective,
    PersonAddComponent,

  ],
  entryComponents: [
    PersonAddComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'Home', component: HomeComponent },
      { path: 'Persons', component: PersonComponent }
    ]),
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
