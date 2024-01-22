import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/Services/toast.service';

import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent implements OnInit {
  hash!: string;
  submitted = false;
  erroMessage = '';
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.hash = params['hash'];
    });
  }

  resetform = this.fb.group({
    plainPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  onSubmit() {
    this.submitted = true;
    if (this.plainPassword.value === this.confirmPassword.value) {
      this.userService
        .resetPassword(this.plainPassword.value, this.hash)
        .then((response) => {
          this.toastService.show(
            response.message,
            'Votre mot de passe a bien été modifié',
          );
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          this.toastService.show('ERREUR', error.error.detail);
        });
    } else {
      this.erroMessage = 'Les mots de passe ne correspondent pas';
    }
  }

  get plainPassword() {
    return this.resetform.get('plainPassword') as FormControl;
  }
  get confirmPassword() {
    return this.resetform.get('confirmPassword') as FormControl;
  }
}
