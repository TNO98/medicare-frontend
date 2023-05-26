import { Component,OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderForm } from 'src/app/model/order-form.model';
import { OrderItem } from 'src/app/model/order-item.model';
import { Orderdata } from 'src/app/model/orderdata';
import { userDto } from 'src/app/model/userDto';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnDestroy {
  states: string[] = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];
  ecomOrderSubs:Subscription;
  paymentPageFormData: any;

  constructor(
    private router: Router,
    private login$: LoginServiceService,
    private ecom: EcommerceService
  ) {}
  

  pay(paymentFrom: NgForm) {
    this.paymentPageFormData = paymentFrom.value;
    const currentUser: userDto = this.login$.getUser();
    const orderItemDtos: OrderItem[] = this.ecom.getCart().orderItemDtos;

    const orderForm = new OrderForm(orderItemDtos, currentUser);

    this.ecomOrderSubs=this.ecom.placeOrder(orderForm).subscribe({
      next: (data) => {
        const orderData=new Orderdata(this.paymentPageFormData,data);
        this.ecom.saveOrderData(orderData);
        this.ecom.clearCart();
        this.router.navigate(['order-placed']);
      },
      error: (err) => console.log(err)
    });
  }

  onKeyUp(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\s/g, ''); // Remove existing spaces

    // Check if the entered character is a number
    const enteredCharacter = value[value.length - 1];
    if (Number.isNaN(Number(enteredCharacter))) {
      value = value.slice(0, -1); // Remove the non-numeric character
    }

    if (value.length > 0 && value.length % 4 === 0 && value.length <= 16) {
      value = value + ' '; // Append space after every fourth character
    }

    if (value.length > 16) {
      value = value.substr(0, 16); // Limit the input to 16 characters
    }

    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i % 4 === 0 && i !== 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }

    input.value = formattedValue; // Update the input value with formatted value
  }
  ngOnDestroy(): void {
    if(this.ecomOrderSubs) this.ecomOrderSubs.unsubscribe();
  }
}
