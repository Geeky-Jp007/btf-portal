import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AuthGuardService as AuthGuard } from './auth-guard.service';
import { SubmitTaskComponent } from './submit-task/submit-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { WorkbookComponent } from './workbook/workbook.component';
import { ShowTaskComponent } from './show-task/show-task.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'submit-task', component: SubmitTaskComponent, canActivate: [AuthGuard]
  },
  {
    path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]
  },
  {
    path: 'workbook', component: WorkbookComponent, canActivate: [AuthGuard]
  },
  {
    path: 'showtask/:id', component: ShowTaskComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: '**', redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
