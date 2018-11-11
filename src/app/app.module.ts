import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { InputTrimModule } from 'ng2-trim-directive';
import { ToastrModule } from 'ng6-toastr-notifications';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routes } from './app.routing';
import { AuthenticationService } from './common/auth.service';
import { ApiService } from './common/api.service';
import { AuthGuard } from './common/auth.gaurd';
import { HeaderComponent } from './common/header/header.component';
import { LeftnavComponent } from './common/leftnav/leftnav.component';
import { AcademicsComponent } from './academics/academics.component';
import { ImagesComponent } from './images/images.component';
import { ImageService } from './images/image.service';
import { AcademicService } from './academics/academics.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    LeftnavComponent,
    AcademicsComponent,
    ImagesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CalendarModule,
    InputTrimModule,
    routes
  ],
  providers: [
    AuthGuard,
    ApiService,
    AuthenticationService,
    ImageService,
    AcademicService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
