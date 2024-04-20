import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionToken = localStorage.getItem('Authorization');
  const router = inject(Router);

  const request = req.clone({
    setHeaders: {
      Authorization: sessionToken ?? '',
    },
  });

  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.error('Unauthorized request:', err);
          router.navigate(['login']);
        } else {
          console.error('HTTP error:', err);
        }
      }
      return throwError(() => err);
    })
  );
};
