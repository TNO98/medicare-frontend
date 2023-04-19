import { Component } from '@angular/core';

export interface medicineDto{
  name:string;
  brand:string;
  price:number;
  category:{
    id:number;
  }

}

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent {

  

}
