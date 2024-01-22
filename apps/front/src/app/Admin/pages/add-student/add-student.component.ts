import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/Student/Student';
import {
  NumberLengthValidator,
  SocialSecurityNumberValidator,
  lettersOnlyValidator,
  phoneNumberValidator,
  allowedCharactersValidator,
} from '../../../validator/validator';
import {
  Fundings,
  PromotionResponse,
  States,
} from '../../../Interface/interface';
import { StudentService } from 'src/app/Services/student.service';
import { HttpResponse } from '@angular/common/http';
import { PromotionService } from 'src/app/Services/promotion.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  studentForm: Student = new Student();
  submitted = false;
  states: States[] = [];
  fundings: Fundings[] = [];
  promotions: PromotionResponse[] = [];
  errorMessage = '';

  constructor(
    private studentService: StudentService,
    private promotionService: PromotionService,
    private fb: FormBuilder,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.states = this.studentService.getFakeStates();
    this.fundings = this.studentService.getFundings();
    this.promotionService.get<any>().subscribe((promotions) => {
      this.promotions = promotions;
    });
  }

  addForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstname: ['', [Validators.required, allowedCharactersValidator()]],
    lastname: ['', [Validators.required, allowedCharactersValidator()]],
    address: ['', [Validators.required]],
    zipcode: ['', [Validators.required, NumberLengthValidator(5)]],
    city: ['', [Validators.required, lettersOnlyValidator()]],
    phoneNumber: ['', [Validators.required, phoneNumberValidator()]],
    socialSecurityNumber: [
      '',
      [Validators.required, SocialSecurityNumberValidator()],
    ],
    dateOfBirth: ['', [Validators.required]],
    promotion: ['', [Validators.required]],
    state: ['', [Validators.required]],
    funding: ['', [Validators.required]],
    gender: ['', [Validators.required]],
  });

  onSubmit() {
    console.log(this.addForm.value);

    const formData = this.addForm.value;
    this.submitted = true;
    if (this.addForm.invalid) return;
    const studentForm = this.mapFormDataToStudent(formData);
    this.studentService.post(studentForm).then(
      (response: HttpResponse<any>) => {
        this.toastService.show(
          'Opération réussie',
          "L'étudiant a bien été ajouté",
        );
        this.addForm.reset();
        this.submitted = false;
      },
      (error) => {
        this.toastService.show('ERREUR', error.error.detail);
      },
    );
    this.submitted = true;
  }

  private mapFormDataToStudent(formData: any): Student {
    return {
      user: {
        id: formData.id,
        email: formData.email,
        lastname: formData.lastname,
        firstname: formData.firstname,
        roles: ['ROLE_STUDENT'],
      },
      address: formData.address,
      zipcode: formData.zipcode.toString(),
      city: formData.city,
      phoneNumber: formData.phoneNumber.toString(),
      dateOfBirth: formData.dateOfBirth,
      socialSecurityNumber: formData.socialSecurityNumber.toString(),
      dateOfExpulsion: formData.dateOfExpulsion,
      dateOfDropout: formData.dateOfDropout,
      funding: formData.funding,
      gender: formData.gender,
      profilPicture: '',
      promotion: '/api/promotions/' + formData.promotion,
      state: formData.state,
    };
  }

  get email() {
    return this.addForm.get('email') as FormControl;
  }

  get lastname() {
    return this.addForm.get('lastname') as FormControl;
  }

  get firstname() {
    return this.addForm.get('firstname') as FormControl;
  }

  get address() {
    return this.addForm.get('address') as FormControl;
  }

  get zipcode() {
    return this.addForm.get('zipcode') as FormControl;
  }

  get city() {
    return this.addForm.get('city') as FormControl;
  }

  get phoneNumber() {
    return this.addForm.get('phoneNumber') as FormControl;
  }

  get gender() {
    return this.addForm.get('gender') as FormControl;
  }

  get dateOfBirth() {
    return this.addForm.get('dateOfBirth') as FormControl;
  }

  get socialSecurityNumber() {
    return this.addForm.get('socialSecurityNumber') as FormControl;
  }

  get state() {
    return this.addForm.get('state') as FormControl;
  }

  get promotion() {
    return this.addForm.get('promotion') as FormControl;
  }

  get funding() {
    return this.addForm.get('funding') as FormControl;
  }
}
