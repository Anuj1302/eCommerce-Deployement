import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {

  product$!: Observable<Product>;
  isAdmin!: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private auth : AuthService
  ) { }

  ngOnInit(): void {
       this.isAdmin = this.auth.isAdmin();
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.product$ = this.productService.getProductById(id);
  }

  // addToCart() {
  //   console.log('Add to cart', this.product$);
  // }

  updateProduct(productId: number) {
    this.router.navigate(['/addProduct', productId]);
  }
  add(id: number) {
    this.cartService.addToCart(id).subscribe();
  }
}
