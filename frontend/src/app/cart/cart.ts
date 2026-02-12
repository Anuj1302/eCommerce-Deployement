import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {

  cart$!: Observable<any[]>;

  constructor(private cartService: CartService,
              private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cart$ = this.cartService.getCart();
    this.cdr.detectChanges();
  }

  remove(productId: number) {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => this.loadCart(),
      error: err => console.error('Remove failed', err)
    });
  }

  increaseQty(productId: number) {
  this.cartService.increase(productId).subscribe(() => {
    this.loadCart();
  });
}

decreaseQty(productId: number) {
  this.cartService.decrease(productId).subscribe(() => {
    this.loadCart();
  });
}

}

