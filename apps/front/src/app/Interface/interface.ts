import { User } from '../User/User';

export interface States {
  name: string;
}

export interface StudentPromotionResponse {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface Fundings {
  name: string;
}

export interface Question {
  key: string;
  text: string;
}

export interface emojiRating {
  key: string;
  value: number;
}

export interface AdviceResponse {
  question1: number;
  question2: number;
  question3: number;
  question4: number;
  question5: number;
  feedback: string;
  student: Student;
  date: Date;
}

export interface StudentResponse {
  id: string;
  user: User;
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
  promotion: StudentPromotionResponse;
  state: string;
}

export interface Lesson {
  id: string;
  name: string;
}

export interface AttendanceListResponse {
  absentStudentsNames: absentUser[];
  date: Date;
  lesson: Lesson;
  presentStudentsCount: number;
  promotion: PromotionResponse;
  promotionId: number;
  teacher: User;
}

export interface absentUser {
  firstname: string;
  lastname: string;
}

export interface PromotionStudent {
  id: number;
  user: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  };
}

export interface BasePromotion {
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface PromotionResponse extends BasePromotion {
  id: number;
  students: PromotionStudent[];
}

export interface PromotionResponseForAttendance extends BasePromotion {
  id: string;
  students: PromotionStudent[];
}

export type PromotionPost = BasePromotion;

export interface StudentList {
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  promotion: string;
  state: string;
}

export interface UserForResetPassword {
  email: string;
}

export interface userForSetPassword {
  password: string;
}

export interface Exam {
  examName: any;
  id: number;
  name: string;
  date: Date;
  lesson: Lesson;
  promotion: PromotionResponse;
  teacher: User;
}

export interface Grade {
  student: any;
  id: number;
  Student: Student;
  exam: Exam;
  date: Date;
  grade: number;
  appreciation: string;
}

export interface StudentForEdit {
  user: UserForStudentEdit;
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
  promotion: string;
  state: string;
}

export interface UserWithMail {
  email: string;
}

export interface UserForEdit {
  user: UserWithMail;
  address: string;
  zipcode: string;
  city: string;
  phoneNumber: string;
}

export interface UserForUploadPicutre {
  profilPicture: string;
}

export interface UserForStudentEdit {
  email: string;
  firstname: string;
  lastname: string;
}

export interface AttendanceStudentResponse {
  id: number;
  date: Date;
  morning: string;
  afternoon: string;
  proofOfAbsence: string;
}

export interface AttendanceStudentForEdit {
  morning: string;
  afternoon: string;
}

export interface DocumentResponse {
  id: number;
  path: string;
  studentId: string;
}
export interface Student {
  id: number;
  user: User;
}

export interface GradeResponse {
  promotionId: number;
  id: number;
  date: Date;
  grade: number;
  appreciation: string;
  student: Student;
  exam: Exam;
  firstname: string;
  lastname: string;
  examName: string;
}
