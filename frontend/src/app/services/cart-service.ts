import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
   constructor(private http: HttpClient) {}


  private api = 'http://localhost:8080/cart';
  addToCart(productId: number) {
    return this.http.post(
      `${this.api}/add/${productId}`,
      {}
    );
  }

  getCart() {
    return this.http.get<any[]>(
      `${this.api}`
    );
  }
  removeFromCart(productId: number) {
    console.log("camer hereee");
    
    return this.http.delete(`${this.api}/remove/${productId}`); 
  }

  increase(productId: number) {
  return this.http.put(
    `${this.api}/increase/${productId}`,
    {}
  );
}

decrease(productId: number) {
  return this.http.put(
    `${this.api}/decrease/${productId}`,
    {}
  );
}

  
}
