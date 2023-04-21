import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MedicineService } from 'src/app/services/medicine.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export class medicineDto {
  constructor(
    public name: string,
    public brand: string,
    public price: number,
    public category : {
       id: number;
    }
  ) {}
}
export class category{
  constructor(public id:number){}
}
export interface Category {
  name: string;
  description: string;
  
}

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css'],
})
export class AddMedicineComponent implements OnInit {
  categories: any;
  url: string;
  cat= new category(0);
  medicineDto:medicineDto= new medicineDto('','',0,this.cat);
  image:File;

  constructor(
    private catService: CategoryService,
    private medService: MedicineService,
    private toast: ToastrService

  ) {}

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => console.log(error),
    });
  }

  onFileSelected(imageFromEvent: any) {
    if (imageFromEvent.target.files) {
      let reader = new FileReader();
      this.image = imageFromEvent.target.files[0];
      reader.readAsDataURL(this.image);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  addMedicine(medicineData: any) {
    let med = medicineData.value;
    this.medicineDto.name=med.name;
    this.medicineDto.brand=med.brand;
    this.medicineDto.price=med.price;
    this.medicineDto.category.id=med.id;
    

    console.log(medicineData.value);
    console.log(medicineDto);
    console.log(this.image);
    console.log(JSON.stringify(this.medicineDto));

    this.medService.saveMedicine(this.medicineDto,this.image).subscribe(
      {
        next: (data)=> {
          this.toast.success(
            'success','medicine added successfully',{
              timeOut:2000,
            }
          )
        },
        error:(err)=>this.toast.error('error','something went wrong!!!')
      }
    )


  }
}
