import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../auth/services/auth.service';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [Navbar, CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  constructor(private productService: ProductService,
              private router : Router,
              private route : ActivatedRoute
  ) { }

  products!: Observable<Product[]>;
  isAdmin = false;

  ngOnInit(): void {

    // this.cdr.detectChanges(); // if using subscribe method to update array
    this.products = this.route.queryParams.pipe(
      switchMap(params => {
        const category = params['category'];
        return this.productService.getAllProducts(category);
      })
    )

    this.isAdmin = sessionStorage.getItem("role") === 'admin'? true : false;
    
  }
  goToDetails(id : number){
    this.router.navigate(['product', id]);
  }
  onAdd(){
    console.log("CAMe on add");
    
    this.router.navigate(['addProduct']);
  }

  onProfile(){
    this.router.navigate(['profile'])
  }


}
