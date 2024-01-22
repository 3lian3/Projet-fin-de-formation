import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Fundings,
  States,
  StudentForEdit,
  StudentResponse,
} from 'src/app/Interface/interface';
import { PromotionService } from 'src/app/Services/promotion.service';
import { StudentService } from 'src/app/Services/student.service';
import { ToastService } from 'src/app/Services/toast.service';
import { Promotion } from 'src/app/promotion/promotion';

@Component({
  selector: 'app-profil',
  templateUrl: './profil-detail-student.component.html',
  styleUrls: ['./profil-detail-student.component.scss'],
})
export class ProfilDetailStudentComponent implements OnInit {
  studentWithData?: StudentResponse;
  listPormotion?: Promotion[];
  listState?: States[];
  listFunding?: Fundings[];
  formDisabled = true;

  editForm = this.fb.group({
    email: [
      { value: this.studentWithData?.user.email, disabled: this.formDisabled },
    ],
    lastname: [
      {
        value: this.studentWithData?.user.lastname,
        disabled: this.formDisabled,
      },
    ],
    firstname: [
      {
        value: this.studentWithData?.user.firstname,
        disabled: this.formDisabled,
      },
    ],
    address: [
      { value: this.studentWithData?.address, disabled: this.formDisabled },
    ],
    zipcode: [
      { value: this.studentWithData?.zipcode, disabled: this.formDisabled },
    ],
    city: [{ value: this.studentWithData?.city, disabled: this.formDisabled }],
    phoneNumber: [
      { value: this.studentWithData?.phoneNumber, disabled: this.formDisabled },
    ],
    dateOfBirth: [
      { value: this.studentWithData?.dateOfBirth, disabled: this.formDisabled },
    ],
    socialSecurityNumber: [
      {
        value: this.studentWithData?.socialSecurityNumber,
        disabled: this.formDisabled,
      },
    ],
    dateOfExpulsion: [
      {
        value: this.studentWithData?.dateOfExpulsion,
        disabled: this.formDisabled,
      },
    ],
    dateOfDropout: [
      {
        value: this.studentWithData?.dateOfDropout,
        disabled: this.formDisabled,
      },
    ],
    funding: [
      { value: this.studentWithData?.funding, disabled: this.formDisabled },
    ],
    gender: [
      { value: this.studentWithData?.gender, disabled: this.formDisabled },
    ],
    promotion: [
      {
        value: this.studentWithData?.promotion.id,
        disabled: this.formDisabled,
      },
    ],
    state: [
      { value: this.studentWithData?.state, disabled: this.formDisabled },
    ],
  });

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private promotionService: PromotionService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((parentParams) => {
      const studentId: string = parentParams['id'];
      this.studentService.getById(studentId).subscribe((student) => {
        this.studentWithData = student;

        this.editForm.patchValue({
          gender: this.studentWithData?.gender || null,
          promotion: this.studentWithData?.promotion?.id || null,
          state: this.studentWithData?.state || null,
          funding: this.studentWithData?.funding || null,
          dateOfBirth: this.studentWithData?.dateOfBirth || null,
        });
      });
    });

    this.promotionService.getPromotions().subscribe((promotions) => {
      this.listPormotion = promotions;
    });
    this.listState = this.studentService.getFakeStates();
    this.listFunding = this.studentService.getFundings();
  }

  enableForm() {
    this.formDisabled = false;
    this.editForm.enable();
  }

  onSubmit(): void {
    if (this.editForm.invalid) return;
    const studentPost: StudentForEdit = {
      user: {
        firstname: this.firstname.value || this.studentWithData?.user.firstname,
        lastname: this.lastname.value || this.studentWithData?.user.lastname,
        email: this.email.value || this.studentWithData?.user.email,
      },
      address: this.address.value || this.studentWithData?.address,
      zipcode: this.zipcode.value || this.studentWithData?.zipcode,
      city: this.city.value || this.studentWithData?.city,
      phoneNumber: this.phoneNumber.value || this.studentWithData?.phoneNumber,
      dateOfBirth: this.dateOfBirth.value || this.studentWithData?.dateOfBirth,
      socialSecurityNumber:
        this.socialSecurityNumber.value ||
        this.studentWithData?.socialSecurityNumber,
      dateOfExpulsion:
        this.dateOfExpulsion.value || this.studentWithData?.dateOfExpulsion,
      dateOfDropout:
        this.dateOfDropout.value || this.studentWithData?.dateOfDropout,
      funding: this.funding.value || this.studentWithData?.funding,
      gender: this.gender.value || this.studentWithData?.gender,
      promotion:
        '/api/promotions/' + this.promotion.value ||
        '/api/promotions/' + this.studentWithData?.promotion.id.toString(),
      state: this.state.value || this.studentWithData?.state,
    };
    this.studentService
      .patch(this.studentWithData!.id.toString(), studentPost)
      .then((response) => {
        this.toastService.show(
          'Opération réussie',
          'Étudiant modifiée avec succès',
        );
        this.formDisabled = true;
        this.editForm.disable();
      })
      .catch((error) => {
        this.toastService.show('ERREUR', error.error.detail);
      });
  }
  get firstname() {
    return this.editForm.get('firstname') as FormControl;
  }

  get lastname() {
    return this.editForm.get('lastname') as FormControl;
  }

  get email() {
    return this.editForm.get('email') as FormControl;
  }

  get phoneNumber() {
    return this.editForm.get('phoneNumber') as FormControl;
  }

  get address() {
    return this.editForm.get('address') as FormControl;
  }

  get city() {
    return this.editForm.get('city') as FormControl;
  }

  get zipcode() {
    return this.editForm.get('zipcode') as FormControl;
  }

  get promotion() {
    return this.editForm.get('promotion') as FormControl;
  }

  get state() {
    return this.editForm.get('state') as FormControl;
  }

  get socialSecurityNumber() {
    return this.editForm.get('socialSecurityNumber') as FormControl;
  }

  get funding() {
    return this.editForm.get('funding') as FormControl;
  }

  get gender() {
    return this.editForm.get('gender') as FormControl;
  }

  get dateOfBirth() {
    return this.editForm.get('dateOfBirth') as FormControl;
  }

  get dateOfExpulsion() {
    return this.editForm.get('dateOfExpulsion') as FormControl;
  }

  get dateOfDropout() {
    return this.editForm.get('dateOfDropout') as FormControl;
  }
}
