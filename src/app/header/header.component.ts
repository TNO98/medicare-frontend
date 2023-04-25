import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { CategoryService } from '../services/category.service';
import { SearchService } from '../services/search.service';

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

  public searchTerm: string = '';

  @Output()
  public searchTermChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchTermChange() {
    this.searchTermChange.emit(this.searchTerm);
    this.searchService.setSearchKeyword(this.searchTerm);
    
  }

  constructor(
    private login: LoginServiceService,
    private category: CategoryService,
    private searchService: SearchService
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
  }

  logout() {
    this.login.logout();
    window.location.reload();
  }

  setCategory(category: string) {
    this.category.setCategory(category);
  }
}
