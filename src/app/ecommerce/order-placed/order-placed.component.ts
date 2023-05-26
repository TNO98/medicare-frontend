import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {

  orderData:any;

  constructor( private ecom:EcommerceService){}

  ngOnInit(): void {
    this.ecom.orderData$.subscribe(
      {
        next: (_orderData)=>this.orderData=_orderData,
        error:(err)=>console.error(err)
        
      }
    )
    console.log(this.orderData);
  }

  printOrderDetails() {
    window.print();
  }
  

}
