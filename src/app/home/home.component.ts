import { Component } from '@angular/core';
import { MedicineService } from '../services/medicine.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import baseUrl from '../services/helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  medicines:any=null;
  baseUrl:string=baseUrl+"/api/medicine/image/";

  constructor(private medicineService:MedicineService,router:Router){}
  
  ngOnInit(){
    this.medicineService.getMedicines().subscribe(
      {
        next: (medicines)=> this.medicines=medicines,
        error: (error)=>console.error(error)  
      }
    )
  }
  
  
  
}
