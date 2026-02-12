import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category-service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  searchText = '';
  results: Product[] = [];
  searchControl = new FormControl('');
  categories$! : Observable<Category[]>;
  showCategory : boolean= false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr : ChangeDetectorRef,
    private categoryService : CategoryService,
    protected authService : AuthService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.categories;
    this.categoryService.getCategories();

    //If you are subscribing then no need of async pipe in HTML
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(text =>{
        return text?.trim()? this.productService.searchProducts(text) : of([])
      })
    ).subscribe(data => {
      this.results = data;
      this.cdr.detectChanges();
    })

  }

  goToProduct(id: number) {
    this.results = [];
    this.searchText = '';
    this.router.navigate(['/product', id]);
  }

  goToCategory(id:  number) {
    this.router.navigate(['/'],{
      queryParams: {category: id}
    })
}

  showCategories(){
    this.showCategory = !this.showCategory;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
