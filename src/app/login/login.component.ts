import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private _toaster:ToastrService
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
        this._toaster.success('Enjoy!!','Login Success!!',{
          timeOut:1000,
          
        })
      },
      error: (error) => {
        this._toaster.error('Invalid details','login failed',{
          timeOut:1000,
          
        })
        console.error(error);
      },
      complete: () => {
        
      },
    });
  }
}
