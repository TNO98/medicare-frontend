import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminGuard } from './guard/admin.guard';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { MedicineComponent } from './admin/medicine/medicine.component';
import { AddMedicineComponent } from './admin/add-medicine/add-medicine.component';
import { UpdateMedicineComponent } from './admin/update-medicine/update-medicine.component';

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
      },
      {
        path:'categories',
        component:CategoriesComponent
      },
      {
        path:'add-category',
        component:AddCategoryComponent
      },
      {
        path: 'medicines',
        component:MedicineComponent
      },
      {
        path:'add-medicine',
        component:AddMedicineComponent
      },
      {
        path:'medicines/update-medicine/:id',
        component:UpdateMedicineComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
