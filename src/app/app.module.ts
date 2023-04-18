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
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { authInterceptorProviders } from './services/auth-interceptor.interceptor';
import { ProfileComponent } from './profile/profile.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    HomeComponent,
    AdminHeaderComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMatComponentsModule,
    HttpClientModule,
    FormsModule,
    RouterModule

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
