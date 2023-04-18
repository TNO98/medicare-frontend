import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private loginService:LoginServiceService, private router:Router, private _snackbar:MatSnackBar ){}

  register(registerForm:NgForm){
    // console.log(registerForm.value)
    this.loginService.register(registerForm.value).subscribe(
      {
        next:(responce)=>console.log(responce),
        error: (error)=> console.error(error),
        complete:()=>{
          this._snackbar.open('Registration Successful!! Login now','x',{
            horizontalPosition:'end',
            verticalPosition: 'top',
            duration:2000
          })
          this.router.navigate(['/login'])}
      }
    )
  }

}
