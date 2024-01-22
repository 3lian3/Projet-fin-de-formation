import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { GetProfilService } from 'src/app/Services/getprofil.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  invalidEmailOrPassword = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private GetProfilService: GetProfilService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    const formData = {
      email: this.email.value,
      password: this.password.value,
    };
    this.authService
      .post(formData)
      .then((response) => {
        console.log(response);

        this.GetProfilService.getUser().subscribe((user) => {
          if (user.roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin']);
          } else if (user.roles.includes('ROLE_TEACHER')) {
            this.router.navigate(['/teacher']);
          } else if (user.roles.includes('ROLE_STUDENT')) {
            this.router.navigate(['/student']);
          } else {
            throw new Error('Role not found');
          }
        });
      })
      .catch((error) => {
        console.log('erreur', error);
        this.invalidEmailOrPassword = true;
      });
  }

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
}
