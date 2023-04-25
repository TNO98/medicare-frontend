import { Component } from '@angular/core';
import { MedicineService } from '../services/medicine.service';
import { OnInit } from '@angular/core';
import baseUrl from '../services/helper';
import { CategoryService } from '../services/category.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  medicines: any = [];
  filteredMedicine: any = [];
  baseUrl: string = baseUrl + '/api/medicine/image/';

  searchText: string;

  // onSearchTextEntered(searchValue: string) {
  //   this.searchText = searchValue;
  //   console.log(this.searchText);
  // }

  constructor(
    private medicineService: MedicineService,
    private categoryService: CategoryService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.searchService.searchKeyword$.subscribe((keyword: string) => {
      if (keyword!='') this.searchText = keyword;
      else this.searchText='';
      console.log(this.searchText);
    });

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
