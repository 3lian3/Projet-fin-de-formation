export class Attendance {
  morning: string;
  afternoon: string;
  proofOfAbsence: string | null;
  constructor() {
    this.morning = '';
    this.afternoon = '';
    this.proofOfAbsence = '' || null;
  }
}
