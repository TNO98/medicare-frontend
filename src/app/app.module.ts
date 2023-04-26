import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMatComponentsModule } from './my-mat-components/my-mat-components.module';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authInterceptorProviders } from './services/auth-interceptor.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { ToastrModule } from 'ngx-toastr';
import { MedicineComponent } from './admin/medicine/medicine.component';
import { AddMedicineComponent } from './admin/add-medicine/add-medicine.component';
import {MatSelectModule} from '@angular/material/select';
import { UpdateMedicineComponent } from './admin/update-medicine/update-medicine.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    HomeComponent,
    ProfileComponent,
    CategoriesComponent,
    AddCategoryComponent,
    MedicineComponent,
    AddMedicineComponent,
    UpdateMedicineComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMatComponentsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatSelectModule,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
    SweetAlert2Module.forChild(),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
