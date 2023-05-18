import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { CategoryService } from '../services/category.service';
import { SearchService } from '../services/search.service';
import { NavigationEnd, Router } from '@angular/router';
import { EcommerceService } from '../services/ecommerce.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public loggedIn = false;
  public user: any = null;
  public categories: any = null;
  public isAdmin = false;
  currentUrl: string;
  public searchTerm: string = '';
  cartItemNum: number;

  @Output()
  public searchTermChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchTermChange() {
    this.searchTermChange.emit(this.searchTerm);
    this.searchService.setSearchKeyword(this.searchTerm);
  }

  constructor(
    private login: LoginServiceService,
    private category: CategoryService,
    private searchService: SearchService,
    private router: Router,
    private ecom: EcommerceService
  ) {}

  ngOnInit() {
    // here we are loading same data two times 1st time  from subject and
    //2nd time from local storage

    // loading data from local storage
    this.loggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();

    this.login.login$.subscribe(({ loginStatus, userModel }) => {
      if (loginStatus && userModel) {
        //loading data from observeable
        this.loggedIn = loginStatus;
        this.user = userModel.userDto;
      }
      //loading data from observeable
      if (this.login.isLoggedIn()) {
        if (this.login.getUserRole() === 'ADMIN') {
          this.isAdmin = true;
        }
      }
    });
    // loading data from local storage
    if (this.login.isLoggedIn()) {
      if (this.login.getUserRole() === 'ADMIN') {
        this.isAdmin = true;
      }
    }

    this.category.getAllCategories().subscribe({
      next: (category) => (this.categories = category),
      error: (error) => console.error(error),
    });

    // subscribing to router events to check if admin/product page
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
    this.ecom.cartItems
      .asObservable()
      .subscribe(
        (itemsInCart) => (this.cartItemNum = itemsInCart.orderItemDtos.length)
      );
  //   //loading cartdata from local storage
  //  this.cartItemNum = this.ecom.getCart().orderItemDtos.length;
  }

  //check if admin product page
  isAdminMedicinePage() {
    return this.currentUrl === '/admin/medicines';
  }

  isProductPage() {
    return this.currentUrl === '/';
  }

  logout() {
    this.login.logout();
    window.location.reload();
  }

  setCategory(category: string) {
    this.category.setCategory(category);
  }
}
