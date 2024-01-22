import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { GetProfilService } from 'src/app/Services/getprofil.service';
import { User } from 'src/app/User/User';

export interface Link {
  url: string;
  name: string;
  icon?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() links?: Link[];

  user?: User;

  constructor(
    private GetProfilService: GetProfilService,
    public AuthService: AuthService,
    private router: Router,
  ) {
    this.GetProfilService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.AuthService.logout().then(
      () => {
        this.GetProfilService.clearUser();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
