import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItemsList } from '../model/order-items-list.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { OrderItem } from '../model/order-item.model';
import { ToastrService } from 'ngx-toastr';
import { OrderForm } from '../model/order-form.model';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {

  cartItems = new BehaviorSubject<OrderItemsList>(this.getCart());
  orderDataSubject= new BehaviorSubject<any>(this.getOrderData());
  orderData$=this.orderDataSubject.asObservable();

  constructor(private http: HttpClient, private toast: ToastrService) {}

  //add to cart feature and also serves increase qty
  addToCart(orderItem: OrderItem) {
    const orderItemDtos = [...this.cartItems.value.orderItemDtos];
    const itemsInCart = orderItemDtos.find(
      (_orderItem) => _orderItem.medicineDto.id === orderItem.medicineDto.id
    );

    if (itemsInCart) {
      if (itemsInCart.quantity< 5) itemsInCart.quantity += 1;
      else this.toast.warning('maximum aloowed quantity is 5');
    } else {
      orderItemDtos.push(orderItem);
      this.toast.success('product added to cart', 'success', { timeOut: 500 });
    }
    this.saveCart({ orderItemDtos });
    this.cartItems.next(this.getCart());
  }
  // get total cart price 
  public getTotal(orderItemDtos:OrderItem[]){
    return orderItemDtos.reduce(
      (accumulator, _orderItem) =>
        accumulator + _orderItem.medicineDto.price * _orderItem.quantity,
      0
    );
  }
  //save cart data
  public saveCart(orderItemDtos: OrderItemsList) {
    let cartData = JSON.stringify(orderItemDtos);
    localStorage.setItem('cart', cartData);
  }

  //get cart data from localstorage
  public getCart(): OrderItemsList {
    const emptyCart: OrderItemsList = { orderItemDtos: [] };
    let cartData = localStorage.getItem('cart');
    if (cartData) return JSON.parse(cartData);
    else return emptyCart;
  }

  //remove item from cart
  public removeItemFromCart(medId: number) {
    let cartData = this.getCart();
    let newOrderItemDtos = this.getCart().orderItemDtos.filter(
      (orderItem) => medId !== orderItem.medicineDto.id
    );
    cartData.orderItemDtos = newOrderItemDtos;
    this.saveCart(cartData);
    this.cartItems.next(this.getCart());
  }
  //remove all items from cart
  public clearCart(){
    if(this.getCart()){
      localStorage.removeItem('cart');
      this.cartItems.next(this.getCart());
    }
  }
  //reduce item qty
  public reduceQuantity(orderItem:OrderItem){
    const orderItemDtos = [...this.cartItems.value.orderItemDtos];
    const itemsInCart = orderItemDtos.find(
      (_orderItem) => _orderItem.medicineDto.id === orderItem.medicineDto.id
    );
    if(itemsInCart) itemsInCart.quantity -= 1;
    this.saveCart({ orderItemDtos });
    this.cartItems.next(this.getCart());
  }

  public placeOrder(OrderForm:OrderForm):any{
    return this.http.post(`${baseUrl}/api/order/`,OrderForm)
  }

  // saving successfully placed  order response data 
  public saveOrderData(orderData:any){
    this.orderDataSubject.next(orderData);
    localStorage.setItem('orderData', JSON.stringify(orderData));
  }
  //getting order data
  public getOrderData():any{
    const emptyOrderData:any=null;
    const orderData:any= JSON.parse(localStorage.getItem('orderData'));
    if(orderData) return orderData;
    else return emptyOrderData;
  }
}
