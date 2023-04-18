import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import{tap} from 'rxjs/operators'
import{Subject } from 'rxjs'

export interface userModel{
  token: string;
    userDto: _user; 
    // {
    //     id: number;
    //     firstName: string;
    //     lastName: string;
    //     email: string;
    //     role: string;
    // }
}
export interface _user{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}


@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {

   private loginSubject= new Subject<{loginStatus:boolean, userModel:userModel}>(); 
   login$ = this.loginSubject.asObservable();

  requestHeader = new HttpHeaders({
    'No-Auth': 'True',
  });

  constructor(private http: HttpClient) {}

  // login and generate token
  public login(loginData: any) {
    return this.http.post<userModel>(`${baseUrl}/api/auth/authenticate`, loginData, {
      headers: this.requestHeader,
    }).pipe(
      tap(
        (resData:userModel)=>{
          this.setToken(resData.token);
          this.setUser(resData.userDto);
          this.loginSubject.next({loginStatus:this.isLoggedIn() , userModel:resData})
        }
      )
    )
  }

  //register a new user
  public register(registerData: any) {
    return this.http.post(`${baseUrl}/api/auth/register`, registerData, {
      headers: this.requestHeader,
    });
  }

  // save token to localstorage
  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // get Token from local storage
  public getToken():string|null{
    return localStorage.getItem('token');
  }

  //save current user to local storage
  public setUser(user: any) {
    let userStr = JSON.stringify(user);
    localStorage.setItem('user', userStr);
  }

  // get current user from local storage
  public getUser(): any {
    let userStr = localStorage.getItem('user');
    if (userStr != null) return JSON.parse(userStr);
    else {
      this.logout();
      return null;
    }
  }

  //to check if user is logged in
  public isLoggedIn(): boolean {
    return this.getToken() && this.getUser();
  }
  // logout function
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  //get current user role
  public getUserRole() {
    let currentUserRole = this.getUser().role;
    if (
      currentUserRole != null ||
      currentUserRole == undefined ||
      currentUserRole == ''
    ) {
      return currentUserRole;
    }
  }
}
