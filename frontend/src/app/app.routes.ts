import { Routes } from '@angular/router';
import { ProductList } from './products/product-list/product-list';
import { AddProduct } from './products/add-product/add-product';
import { ProductDetails } from './products/product-details/product-details';
import { Login } from './auth/login/login';
import { AuthGuard } from './auth/guards/auth.guard';
import { SignupComponent } from './auth/signup/signup';
import { adminGuardTsGuard } from './auth/guards/admin-guard';
import { Profile } from './app/profile/profile';
import { Cart } from './cart/cart';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: SignupComponent },
  { path: '', component: ProductList },
  { path: 'product/:id', component: ProductDetails },
  {path: 'profile', component: Profile, canActivate: [AuthGuard]},
  {path: 'cart', component: Cart},
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'addProduct/:id', component: AddProduct },
      
    ]
  },
  {
    path: 'addProduct',
    loadComponent: () =>
      import('./products/add-product/add-product')
        .then(m => m.AddProduct),
    canActivate: [AuthGuard, adminGuardTsGuard]
  },
];
