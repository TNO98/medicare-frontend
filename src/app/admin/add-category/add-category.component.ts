import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  constructor( private service: CategoryService,private  snackbar:MatSnackBar){}

  public addCategory(addCategoryForm:NgForm){
      this.service.createCategory(addCategoryForm.value).subscribe(
        {
          next: (responce)=>{this.snackbar.open('Category Added Succesfully','ok',{
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 2000,
          })},
          error:(error)=>{
            this.snackbar.open('Something went wrong !!','x',{
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 2000,
            })
          }

        }
      )
  }
}
