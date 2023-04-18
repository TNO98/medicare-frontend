import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminGuard } from './guard/admin.guard';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';

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
    canActivate:[AdminGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
