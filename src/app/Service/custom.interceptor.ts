import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const CustomInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const _snackBar = inject(MatSnackBar);
  // Clone the request and add the authorization header
  
  const token = authService.getToken();
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });  
  // Pass the cloned request with the updated header to the next handler

  
  return next(authReq).pipe(
    tap({
      next: () => console.log('Request sent'),
      complete: () => console.log('Request completed'),
      error: (err) => {        
        if(err.error)
          _snackBar.open(err.error.message, 'Close', { verticalPosition: 'top', });
        else
          _snackBar.open("Invalid credentials. Please check your credentials and try again.", 'Close', { verticalPosition: 'top', });
      }
    })
  );;
};




