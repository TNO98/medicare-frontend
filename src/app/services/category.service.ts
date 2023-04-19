import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

export interface Category{
  name:string;
  description:string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAllCategories(){
    return this.http.get(`${baseUrl}/api/category/`);
  }

  createCategory(category:Category){

    return this.http.post(`${baseUrl}/api/category/`,category);

  }
}
