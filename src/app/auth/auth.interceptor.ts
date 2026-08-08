import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from '@openng/optimus-ui/api';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LOCAL_STORAGE_KEYS } from '../shared/globals';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTHORIZATION);
  const router = inject(Router);
  const messageService = inject(MessageService);

  const request = req.clone({
    setHeaders: {
      Authorization: sessionToken ?? '',
    },
  });

  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        messageService.add({
          severity: 'error',
          detail: `Error: ${parseError(err)}`,
          life: 5000,
        });
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

function parseError(err: HttpErrorResponse): string {
  return `${err.error.statusCode} - ${err.error.message}`;
}
