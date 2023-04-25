import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchKeywordSubject = new BehaviorSubject<string>('');
  public searchKeyword$ = this.searchKeywordSubject.asObservable();

  setSearchKeyword(sk: string) {
    this.searchKeywordSubject.next(sk);
  }

  constructor() {}
}
