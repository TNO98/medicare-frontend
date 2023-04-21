import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

export interface MedicineDto{
  name:string;
  brand:string;
  price:number;
  category:{
    id:number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  requestHeader=new HttpHeaders(
    {
      "No-Auth" : "True"
    }
  )

  constructor(private http : HttpClient) { }

  public getMedicines(){
    return this.http.get(`${baseUrl}/api/medicine/`)
  }

  public saveMedicine(medicineDto:MedicineDto,image:File){
    let formData= new FormData();
    formData.append('medicineDto', JSON.stringify(medicineDto));
    formData.append('image', image);
    return this.http.post(`${baseUrl}/api/medicine/`,formData);
  }
  
}
