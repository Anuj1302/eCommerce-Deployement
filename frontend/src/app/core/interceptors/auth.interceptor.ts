import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  // ✅ Do NOT intercept auth + public APIs
  if (
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/refresh') ||
    req.url.includes('/getProducts') ||
    req.url.includes('/products/search') ||
    (req.url.includes('/product/') && req.url.endsWith('/image'))
  ) {
    return next(req);
  }

  const token = sessionStorage.getItem('token');

  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    : req;

  return next(authReq).pipe(
    catchError(err => {

      // 🔑 ONLY refresh on 401
      if (err.status === 401) {

        return authService.refreshToken().pipe(
          switchMap(() => {

            const newToken = sessionStorage.getItem('token');

            // ❌ refresh failed → logout
            if (!newToken) {
              authService.logout();
              return throwError(() => err);
            }

            // 🔁 retry original request with new token
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` }
            });

            return next(retryReq);
          }),
          catchError(refreshErr => {
            authService.logout();
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => err);
    })
  );
};
