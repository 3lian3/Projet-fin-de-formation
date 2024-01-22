import { CanActivateFn, Router } from '@angular/router';
import { GetProfilService } from '../Services/getprofil.service';
import { User } from '../User/User';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const StudentGuard: CanActivateFn = (route) => {
  const getProfilService = inject(GetProfilService);
  const router = inject(Router);
  return getProfilService.getUser().pipe(
    map((user: User) => {
      if (user && user.roles.includes('ROLE_STUDENT')) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
  );
};
