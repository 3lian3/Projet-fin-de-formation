import { User } from '../User/User';

export class Student {
  address: string;
  zipcode: string;
  city: string;
  phoneNumber: string;
  dateOfBirth: Date;
  socialSecurityNumber: string;
  dateOfExpulsion: Date;
  dateOfDropout: Date;
  funding: string;
  gender: string;
  profilPicture: string;
  promotion: string;
  state: string;

  constructor(public user?: User) {
    this.address = '';
    this.zipcode = '';
    this.city = '';
    this.phoneNumber = '';
    this.dateOfBirth = new Date();
    this.socialSecurityNumber = '';
    this.dateOfExpulsion = new Date();
    this.dateOfDropout = new Date();
    this.funding = '';
    this.gender = '';
    this.profilPicture = '';
    this.promotion = '';
    this.state = '';
  }
}
