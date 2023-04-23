import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { BehaviorSubject } from 'rxjs';

export interface Category{
  name:string;
  description:string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categorySource = new BehaviorSubject<string>('all');
  currentCategory = this.categorySource.asObservable();

  setCategory(category: string) {
    this.categorySource.next(category);
  }

  constructor(private http:HttpClient) { }

  getAllCategories(){
    return this.http.get(`${baseUrl}/api/category/`);
  }

  createCategory(category:Category){

    return this.http.post(`${baseUrl}/api/category/`,category);

  }
}
