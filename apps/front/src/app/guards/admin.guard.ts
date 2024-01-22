import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GetProfilService } from '../Services/getprofil.service';
import { User } from '../User/User';
import { map } from 'rxjs';

export const AdminGuard: CanActivateFn = (route) => {
  const getProfilService = inject(GetProfilService);
  const router = inject(Router);
  return getProfilService.getUser().pipe(
    map((user: User) => {
      if (user && user.roles.includes('ROLE_ADMIN')) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
  );
};
