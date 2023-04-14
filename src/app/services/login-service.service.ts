import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  requestHeader=new HttpHeaders(
    {
      "No-Auth" : "True"
    }
  )

  constructor(private http:HttpClient) { }

  public login(loginData : any){
    return this.http.post(`${baseUrl}/api/auth/authenticate`,loginData,{headers : this.requestHeader} )
  }

  public register(registerData:any){
    return this.http.post(`${baseUrl}/api/auth/register`,registerData,{headers:this.requestHeader})
  }

  public setToken(token:string){
    localStorage.setItem('token',token);
  }
  public getToken():string|null{
    return localStorage.getItem('token');
  }
  public setUser(user:any){
    localStorage.setItem('user',user);
  }
  public getUser():any{
    return localStorage.getItem('user');
  }
  public isLoggedIn():any{
    return this.getToken() && this.getUser();
  }
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}
