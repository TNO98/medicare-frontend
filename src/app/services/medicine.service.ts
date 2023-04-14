import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

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
  
}
