import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-update-medicine',
  templateUrl: './update-medicine.component.html',
  styleUrls: ['./update-medicine.component.css'],
})
export class UpdateMedicineComponent implements OnInit {
  medicineId: number;
  medicine: any;
  categories: any;
  url: string;
  image: File;

  constructor(
    private _router: ActivatedRoute,
    private medicineService: MedicineService,
    private categoryService: CategoryService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.medicineId = this._router.snapshot.params['id'];
    console.log(this.medicineId);
    this.medicineService.findMedicineById(this.medicineId).subscribe({
      next: (medicineData) => {
        this.medicine = medicineData;
        console.log(this.medicine);
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.categoryService.getAllCategories().subscribe({
      next: (catData) => (this.categories = catData),
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
  // there is a bug while in databinding of category
  // category can not be updated right now ..will fix later
  updateMedicine() {
    this.medicineService
      .updateMedicine(this.medicineId, this.medicine, this.image)
      .subscribe({
        next: (data) => {
          this.toast.success(
            'medicine updated successfully',
            'Update Success!!'
            
          );
          console.log(data);
          console.log(this.medicine);
        },
        error: (error) => {
          this.toast.error(
            'Something went wrong while updating medicine',
            'Error!!'
          );
          console.log(error);
        },
      });
  }
}
