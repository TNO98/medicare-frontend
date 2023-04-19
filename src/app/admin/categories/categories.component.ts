import { Component,OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  categories:any = null;
  constructor(private service:CategoryService){}
  ngOnInit(): void {
    this.service.getAllCategories().subscribe(
      {
        next:(cat)=>this.categories=cat,
        error: (error)=> console.error(error)
      }
    )
  }
  

}
