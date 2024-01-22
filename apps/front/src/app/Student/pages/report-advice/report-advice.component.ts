import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Advice } from 'src/app/Advice/Advice';
import { Question, emojiRating } from 'src/app/Interface/interface';
import { AdviceService } from 'src/app/Services/advice.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-report-advice',
  templateUrl: './report-advice.component.html',
  styleUrls: ['./report-advice.component.scss'],
})
export class ReportAdviceComponent implements OnInit {
  advice: Advice = new Advice();
  submitted = false;
  questions: Question[] = [];
  emojis: emojiRating[] = [];
  formDisabled = false;
  today: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private AdviceService: AdviceService,
    private datePipe: DatePipe,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.questions = this.AdviceService.getQuestions();
    this.emojis = this.AdviceService.getEmoji();
    this.checkFormStatus();
  }

  adviceForm = this.fb.group({
    question1: ['', Validators.required],
    question2: ['', Validators.required],
    question3: ['', Validators.required],
    question4: ['', Validators.required],
    question5: ['', Validators.required],
    studentFeedback: [''],
  });

  onSubmit() {
    this.submitted = true;
    this.adviceForm.markAllAsTouched();

    if (this.adviceForm.invalid) {
      return;
    }

    this.advice = {
      question1: parseInt(this.question1.value),
      question2: parseInt(this.question2.value),
      question3: parseInt(this.question3.value),
      question4: parseInt(this.question4.value),
      question5: parseInt(this.question5.value),
      feedback: this.studentFeedback.value,
    };
    this.AdviceService.post(this.advice)
      .then(() => {
        this.toastService.show('Opération réussie', 'Merci pour votre retour');
        this.adviceForm.reset();
        this.submitted = false;
        this.formDisabled = true;
      })
      .catch((error) => {
        this.toastService.show('ERREUR', error.error.message);
      });
  }

  get question1() {
    return this.adviceForm.get('question1') as FormControl;
  }

  get question2() {
    return this.adviceForm.get('question2') as FormControl;
  }

  get question3() {
    return this.adviceForm.get('question3') as FormControl;
  }

  get question4() {
    return this.adviceForm.get('question4') as FormControl;
  }

  get question5() {
    return this.adviceForm.get('question5') as FormControl;
  }

  get studentFeedback() {
    return this.adviceForm.get('studentFeedback') as FormControl;
  }

  checkFormStatus(): void {
    const today = new Date();
    const dayOfWeek = this.datePipe.transform(today, 'EEEE');
    const isMondayTothursday =
      dayOfWeek === 'lundi' ||
      dayOfWeek === 'mardi' ||
      dayOfWeek === 'mercredi' ||
      dayOfWeek === 'jeudi';
    const adviceDay =
      dayOfWeek === 'vendredi' ||
      dayOfWeek === 'samedi' ||
      dayOfWeek === 'dimanche';
    if (this.submitted) {
      this.formDisabled = true;
    }
    if (isMondayTothursday) {
      this.formDisabled = true;
    }
    if (adviceDay) {
      this.formDisabled = false;
    }
    console.log(isMondayTothursday);
    console.log(adviceDay);
    console.log(this.submitted);
  }
}
