import { Component } from '@angular/core';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent {
  constructor(public toastService: ToastService) {}
}
