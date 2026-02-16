import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // private baseUrl = 'http://localhost:8080/categories';
  private categorySubject = new BehaviorSubject<Category[]>([]);

  categories = this.categorySubject.asObservable();

  constructor(private http: HttpClient){}
  
  getCategories():void{
    if (this.categorySubject.value.length > 0) {
      return;
    }
     this.http.get<Category[]>(`${environment.apiUrl}/categories`).subscribe( {
      next: (data) => this.categorySubject.next(data),
      error: (err) => console.error('Category load failed', err)
     });
  }
}
