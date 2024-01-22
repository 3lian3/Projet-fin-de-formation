import { CanActivateFn, Router } from '@angular/router';
import { User } from '../User/User';
import { map } from 'rxjs';
import { inject } from '@angular/core';
import { GetProfilService } from '../Services/getprofil.service';

export const TeacherGuard: CanActivateFn = (route) => {
  const getProfilService = inject(GetProfilService);
  const router = inject(Router);
  return getProfilService.getUser().pipe(
    map((user: User) => {
      if (user && user.roles.includes('ROLE_TEACHER')) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
  );
};
