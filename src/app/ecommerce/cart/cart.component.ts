import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { OrderItem } from 'src/app/model/order-item.model';
import { OrderItemsList } from 'src/app/model/order-items-list.model';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import baseUrl from 'src/app/services/helper';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartData: OrderItemsList = { orderItemDtos: [] };
  cartSubs: Subscription;
  displayedColumns: string[] = [
    'image',
    'name',
    'price',
    'Qty',
    'subtotal',
    'action',
  ];

  baseUrl: string = baseUrl + '/api/medicine/image/';

  constructor(private ecom: EcommerceService, private toaster: ToastrService) {}

  ngOnInit(): void {
    this.cartSubs = this.ecom.cartItems.asObservable().subscribe({
      next: (data) => (this.cartData = data),
      error: (err) => this.toaster.error('Something went wrong'),
    });

  }

  onRemoveQuantity(element: OrderItem) {
    this.ecom.reduceQuantity(element);
  }
  onAddQuantity(element: OrderItem) {
    this.ecom.addToCart(element);
  }
  onRemoveFromCart(element: OrderItem) {
    this.ecom.removeItemFromCart(element.medicineDto.id);
  }

  getTotal(orderItemDtos:OrderItem[]):number{
    return this.ecom.getTotal(orderItemDtos);
  }

  ngOnDestroy(): void {
    if (this.cartSubs) this.cartSubs.unsubscribe();
  }
}
