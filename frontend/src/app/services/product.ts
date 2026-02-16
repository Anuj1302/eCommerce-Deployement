import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class ProductService {

  // private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllProducts(category? :number): Observable<Product[]> {
    let params = new HttpParams();
    if(category){
      params = params.set('category', category);
    }
    return this.http.get<Product[]>(`${environment.apiUrl}/getProducts`, {params});
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/getProducts/${id}`);
  }

  addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/product`, formData);
  }

  updateProduct(id : number, formData: FormData) {
    return this.http.put(`${environment.apiUrl}/product/${id}`, formData);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.apiUrl}/product/${id}`);
  }

  getProductImageUrl(id: number): string {
    return `${environment.apiUrl}/product/${id}/image`;
  }

  searchProducts(keyword: string): Observable<Product[]> {
  return this.http.get<Product[]>(
    `${environment.apiUrl}/products/search?keyword=${keyword}`
  );
}
}
