import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Services/toast.service';
import { UserService } from 'src/app/Services/user.service';
import { UserResponse } from 'src/app/User/User';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  users: UserResponse[] = [];
  invalidEmailOrPassword = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  resetform = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    const formData = {
      email: this.email.value,
    };
    console.log(formData);
    this.userService
      .resetPasswordUser(formData)
      .then(() => {
        this.toastService.show(
          'Un email vous a été envoyé',
          'Veuillez vérifier votre boite mail',
        );
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.toastService.show('ERREUR', error.error.detail);
      });
  }

  get email() {
    return this.resetform.get('email') as FormControl;
  }
}
