import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: any = null;
  constructor(private service: CategoryService) {}
  ngOnInit(): void {
    this.getAllCtegories();
  }

  getAllCtegories() {
    this.service.getAllCategories().subscribe({
      next: (cat) => (this.categories = cat),
      error: (error) => console.error(error),
    });
  }

  deleteCategory(id: number) {
    this.service.deleteCategory(id).subscribe({
      next: () => {
        alert('Category deleted successfully');
        this.getAllCtegories();
      },
      error: (error) => console.log(error),
    });

    console.log(id);
  }
}
