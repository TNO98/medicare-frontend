import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/services/medicine.service';
import baseUrl from '../../services/helper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css'],
})
export class MedicineComponent implements OnInit {
  medicines: any = null;
  baseUrl: string = baseUrl + '/api/medicine/image/';
  constructor(
    private medicineService: MedicineService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllmedicines();
  }

  getAllmedicines() {
    this.medicineService.getMedicines().subscribe({
      next: (data) => {
        this.medicines = data;
      },
      error: (err) => console.error(err),
    });
  }
  deleteMed(id: number) {
    this.medicineService.deleteMedicine(id).subscribe({
      next: (res) => {
        this.toast.success('Medicine Deleted successfully!!!', 'deleted');
        this.getAllmedicines();
      },
      error: (err) =>
        this.toast.error('Something went wrong', 'couldnt be deleted'),
    });
  }
}
