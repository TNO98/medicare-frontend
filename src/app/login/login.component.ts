import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private loginService:LoginServiceService, private router:Router,private _snackbar:MatSnackBar){}

  login(loginForm :NgForm){
    this.loginService.login(loginForm.value).subscribe(
      {
        next:(responce:any)=>{  
          this.loginService.setToken(responce.token);
          this.loginService.setUser(JSON.stringify(responce.userDto));
          let role:string=responce.userDto.role;
          if(role=='ADMIN') this.router.navigate(['admin']);
          else this.router.navigate(['']);
          console.log(localStorage.getItem('token'));
          console.log(localStorage.getItem('user'));

        },
        error: (error)=> console.error(error),
        complete:()=>{
          this._snackbar.open('Login Success','x',{
            horizontalPosition:'end',
            verticalPosition: 'top',
            duration:3000
          })}
      }
    );

  }
    
}
