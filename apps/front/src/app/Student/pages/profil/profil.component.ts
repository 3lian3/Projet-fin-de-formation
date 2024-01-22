import { Component, OnInit } from '@angular/core';
import { GetProfilService } from 'src/app/Services/getprofil.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { UserForEdit } from 'src/app/Interface/interface';
import { StudentService } from 'src/app/Services/student.service';
import { UserService } from 'src/app/Services/user.service';
import { UploadImageService } from 'src/app/Services/upload-image.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  UserWithData?: any;
  formDisabled = true;
  imageUploadService: UploadImageService | undefined;

  editForm = this.fb.group({
    email: [{ value: '', disabled: true }],
    address: [{ value: '', disabled: true }],
    zipcode: [{ value: '', disabled: true }],
    city: [{ value: '', disabled: true }],
    phoneNumber: [{ value: '', disabled: true }],
  });

  enableForm() {
    this.formDisabled = false;
    this.editForm.enable();
  }

  ngOnInit(): void {
    this.getProfilService.get().subscribe((user) => {
      this.UserWithData = user;
      console.log(this.UserWithData);
      this.editForm.patchValue({
        email: this.UserWithData?.email || '',
        address: this.UserWithData?.student?.address || '',
        zipcode: this.UserWithData?.student?.zipcode || '',
        city: this.UserWithData?.student?.city || '',
        phoneNumber: this.UserWithData?.student?.phoneNumber || '',
      });
    });
  }

  constructor(
    private getProfilService: GetProfilService,
    private fb: FormBuilder,
    private studentService: StudentService,
    private UserService: UserService,
    private uploadImageService: UploadImageService,
    private toastService: ToastService,
  ) {}

  onSubmit() {
    const userPost: UserForEdit = {
      user: {
        email: this.editForm.value.email || this.UserWithData?.email || '',
      },
      address:
        this.editForm.value.address ||
        this.UserWithData?.student?.address ||
        '',
      city: this.editForm.value.city || this.UserWithData?.student?.city || '',
      phoneNumber:
        this.editForm.value.phoneNumber ||
        this.UserWithData?.student?.phoneNumber ||
        '',
      zipcode:
        this.editForm.value.zipcode ||
        this.UserWithData?.student?.zipcode ||
        '',
    };

    if (this.UserWithData?.student) {
      this.studentService
        .patch(this.UserWithData.student.id, userPost)
        .then((response) => {
          this.toastService.show(
            'Opération réussie',
            'Profil modifié avec succès',
          );
          this.formDisabled = true;
          this.editForm.disable();
        })
        .catch((error) => {
          this.toastService.show('ERREUR', error.error.detail);
        });
    }
  }

  resetPassword() {
    const UserForResetPasswordWithMail = {
      email: this.UserWithData?.email,
    };
    this.UserService.resetPasswordUser(UserForResetPasswordWithMail)
      .then(() => {
        this.toastService.show(
          'Un email vous a été envoyé',
          'Veuillez vérifier votre boite mail',
        );
      })
      .catch((error) => {
        this.toastService.show('ERREUR', error.error.detail);
      });
  }

  onSelect(event: any) {
    const file = event.target.files[0];
    const userId = this.UserWithData?.student?.id;
    if (file) {
      this.uploadImageService.uploadImage(userId, file).subscribe(
        (response) => {
          this.toastService.show(
            'Opération réussie',
            'Image enregistrée avec succès',
          );
        },
        (error) => {
          this.toastService.show('ERREUR', error.error.detail);
        },
      );
    } else {
      this.toastService.show('ERREUR', 'format image invalide !');
    }
  }

  get email() {
    return this.editForm.get('email') as FormControl;
  }

  get address() {
    return this.editForm.get('address') as FormControl;
  }

  get zipcode() {
    return this.editForm.get('zipcode') as FormControl;
  }

  get city() {
    return this.editForm.get('city') as FormControl;
  }

  get phoneNumber() {
    return this.editForm.get('phoneNumber') as FormControl;
  }
}
