import { Attendance } from './Attendance';

export class AttendanceTeacher extends Attendance {
  promotion: string;
  lesson: string;
  constructor() {
    super();
    this.promotion = '';
    this.lesson = '';
  }
}
