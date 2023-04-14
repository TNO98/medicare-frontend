import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'register',
    component:RegisterComponent,
    pathMatch:'full'
  },
  {
    path: 'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'admin',
    component:DashboardComponent,
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
