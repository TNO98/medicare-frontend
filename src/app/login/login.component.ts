import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {
   if(this.loginService.isLoggedIn())this.router.navigate(['']);
  }

  login(loginForm: NgForm) {
    this.loginService.login(loginForm.value).subscribe({
      next: (responce: any) => {
        let role: string = this.loginService.getUserRole();
        if (role == 'ADMIN') {
          this.router.navigate(['admin']);
        } else if (role == 'USER') {
          this.router.navigate(['']);
        } else {
          this.loginService.logout();
        }
        console.log(localStorage.getItem('token'));
        console.log(localStorage.getItem('user'));
      },
      error: (error) => {
        this._snackbar.open('Invalid Details, try again!!', 'x', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 2000,
        });
        console.error(error);
      },
      complete: () => {
        this._snackbar.open('Login Success', 'x', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 2000,
        });
      },
    });
  }
}
