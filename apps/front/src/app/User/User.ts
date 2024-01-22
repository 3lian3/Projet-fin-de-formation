import { Student } from '../Student/Student';

export class User {
  constructor(
    public id: string,
    public email: string,
    public lastname: string,
    public firstname: string,
    public roles: string[],
    public student?: Student,
  ) {}
}

export interface UserResponse {
  id: string;
  email: string;
  lastname: string;
  firstname: string;
  roles: string[];
}
