import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if(!authService.isLoggedIn() || authService.getRole() !='ADMIN'){
    router.navigateByUrl('/login');
    return false; 
  }

  return authService.isLoggedIn() && authService.getRole() == 'ADMIN';
};
