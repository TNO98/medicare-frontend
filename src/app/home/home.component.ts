import { Component, OnDestroy } from '@angular/core';
import { MedicineService } from '../services/medicine.service';
import { OnInit } from '@angular/core';
import baseUrl from '../services/helper';
import { CategoryService } from '../services/category.service';
import { SearchService } from '../services/search.service';
import { EcommerceService } from '../services/ecommerce.service';
import { Medicine } from '../model/medicine.model';
import { OrderItem } from '../model/order-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  medicines: Medicine[] | undefined = [];
  filteredMedicine: any = [];
  baseUrl: string = baseUrl + '/api/medicine/image/';
  isPresentInCart: boolean = false;
  searchText: string;
  medSubscription: Subscription;
  categorySubs: Subscription;

  constructor(
    private medicineService: MedicineService,
    private categoryService: CategoryService,
    private searchService: SearchService,
    private ecom: EcommerceService
  ) {}

  ngOnInit() {
    this.searchService.searchKeyword$.subscribe((keyword: string) => {
      if (keyword != '') this.searchText = keyword;
      else this.searchText = '';
      //console.log(this.searchText);
    });

    this.medSubscription = this.medicineService.getMedicines().subscribe({
      next: (medicines: any[]) => {
        this.medicines = medicines;
        this.filterMedicine('all');
      },
      error: (error) => console.error(error),
    });

    this.categorySubs = this.categoryService.currentCategory.subscribe(
      (category) => {
        this.filterMedicine(category);
      }
    );
  }

  // filtering medicines according to category
  filterMedicine(category: string) {
    this.filteredMedicine = this.medicines.filter((medicine: Medicine) => {
      return category === 'all' || medicine.category.name === category;
    });
  }

  addToCart(product: Medicine) {
    const selectedOrderItem = new OrderItem(product, 1);
    this.ecom.addToCart(selectedOrderItem);
  }

  ngOnDestroy(): void {
    if (this.categorySubs) this.categorySubs.unsubscribe();
    if (this.medSubscription) this.medSubscription.unsubscribe();
  }
}
