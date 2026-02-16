import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CartService {
   constructor(private http: HttpClient) {}


  // private api = 'http://localhost:8080/cart';
  addToCart(productId: number) {
    return this.http.post(
      `${environment.apiUrl}/cart/add/${productId}`,
      {}
    );
  }

  getCart() {
    return this.http.get<any[]>(
      `${environment.apiUrl}/cart`
    );
  }
  removeFromCart(productId: number) {
    console.log("camer hereee");
    
    return this.http.delete(`${environment.apiUrl}/cart/remove/${productId}`); 
  }

  increase(productId: number) {
  return this.http.put(
    `${environment.apiUrl}/cart/increase/${productId}`,
    {}
  );
}

decrease(productId: number) {
  return this.http.put(
    `${environment.apiUrl}/cart/decrease/${productId}`,
    {}
  );
}

  
}
