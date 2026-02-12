import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllProducts(category? :number): Observable<Product[]> {
    let params = new HttpParams();
    if(category){
      params = params.set('category', category);
    }
    return this.http.get<Product[]>(`${this.baseUrl}/getProducts`, {params});
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/getProducts/${id}`);
  }

  addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/product`, formData);
  }

  updateProduct(id : number, formData: FormData) {
    return this.http.put(`${this.baseUrl}/product/${id}`, formData);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/product/${id}`);
  }

  getProductImageUrl(id: number): string {
    return `${this.baseUrl}/product/${id}/image`;
  }

  searchProducts(keyword: string): Observable<Product[]> {
  return this.http.get<Product[]>(
    `${this.baseUrl}/products/search?keyword=${keyword}`
  );
}
}
