import { Component } from '@angular/core';
import { MedicineService } from '../services/medicine.service';
import { OnInit } from '@angular/core';
import baseUrl from '../services/helper';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  medicines: any = [];
  filteredMedicine: any = [];
  baseUrl: string = baseUrl + '/api/medicine/image/';

  constructor(
    private medicineService: MedicineService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.medicineService.getMedicines().subscribe({
      next: (medicines) => {
        this.medicines = medicines;
        this.filterMedicine('all');
      },
      error: (error) => console.error(error),
    });

    this.categoryService.currentCategory.subscribe((category) => {
      this.filterMedicine(category);
    });
  }


  filterMedicine(category: string) {
    this.filteredMedicine = this.medicines.filter((medicine) => {
      return category === 'all' || medicine.category.name === category;
    });
  }
}
