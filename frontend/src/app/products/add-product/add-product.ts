import { CommonModule, provideNetlifyLoader } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct implements OnInit {
  productForm!: FormGroup;
  selectedImage!: File | null;
  imagePreviewUrl: string | null = null;
  isEditMode: boolean = false;
  productId!: number;
  categories$!: Observable<Category[]>;

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.categories;
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      brand: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      releaseDate: [''],
      isAvailable: [true],
      quantity: [0, [Validators.required, Validators.min(0)]]
      // image: ['']
    });

    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.productId) {
      this.isEditMode = true;
      this.loadData(this.productId);
    } else {
      this.isEditMode = false;
    }
    console.log("form ", this.productForm);

  }
  loadData(id: number) {
    this.imagePreviewUrl = this.productService.getProductImageUrl(id);
    this.productService.getProductById(id).subscribe(product => {
      this.productForm.patchValue(product);
    })
  }
  onSubmit() {
    // if (this.productForm.invalid) return;
    const formData = new FormData();
    const productBlob = new Blob(
      [JSON.stringify(this.productForm.value)],
      { type: 'application/json' }
    )
    formData.append('product', productBlob);
    formData.append('image', this.selectedImage!);

    if (this.isEditMode) {
      this.productService.updateProduct(this.productId, formData).subscribe({
        next: (res) => {
          console.log('Product saved', res);
          this.productForm.reset();
          this.router.navigate(['/'])
        },
        error: (err) => {
          console.error('Error saving product', err);
        }
      });
    } else {
      this.productService.addProduct(formData).subscribe({
        next: (res) => {
          console.log('Product saved', res);
          this.productForm.reset();
        },
        error: (err) => {
          console.error('Error saving product', err);
        }
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, JPEG, PNG files allowed');
        return;
      }

      this.selectedImage = file;
      this.imagePreviewUrl = URL.createObjectURL(file);
    }
  }

  removeImage(fileInput: HTMLInputElement) {
    this.selectedImage = null;

    if (this.imagePreviewUrl) {
      URL.revokeObjectURL(this.imagePreviewUrl);
    }
    this.imagePreviewUrl = null;
    fileInput.value = '';
  }

  deleteProduct() {
  if (!this.productId) return;

  if (!confirm('Are you sure you want to delete this product?')) {
    return;
  }

  this.productService.deleteProduct(this.productId).subscribe({
    next: () => {
      alert('Product deleted successfully');
      this.router.navigate(['/']);
    },
    error: (err) => {
      console.error(err);
      alert('Failed to delete product');
    }
  });
}



}
