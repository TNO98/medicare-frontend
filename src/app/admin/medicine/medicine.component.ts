import { Component , OnInit} from '@angular/core';
import { MedicineService } from 'src/app/services/medicine.service';
import baseUrl from '../../services/helper';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  medicines:any=null;
  baseUrl:string=baseUrl+"/api/medicine/image/";
  constructor(private medicineService:MedicineService){}
  ngOnInit(): void {
    this.medicineService.getMedicines().subscribe(
      {
        next:(data)=>{
          this.medicines=data;
        },
        error:(err)=>console.error(err)
      }
    )
  }

  

}
