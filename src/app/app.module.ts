import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SubmitTaskComponent } from './submit-task/submit-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { WorkbookComponent } from './workbook/workbook.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ShowTaskComponent } from './show-task/show-task.component';

const firebaseConfig = {
  apiKey: "AIzaSyB-d3tK6D_rX9MTE9t0ZBuzEZ4Cd6iQano",
  authDomain: "boddhitreefoundation-7a7f8.firebaseapp.com",
  projectId: "boddhitreefoundation-7a7f8",
  storageBucket: "boddhitreefoundation-7a7f8.appspot.com",
  messagingSenderId: "253015789859",
  appId: "1:253015789859:web:cfee2c8222d9170a227c96",
  measurementId: "G-SN8MTDCRG3"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SubmitTaskComponent,
    TasksComponent,
    WorkbookComponent,
    LoginComponent,
    SignupComponent,
    ShowTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
