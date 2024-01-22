import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from './Interceptor/Request.interptor';
import { DetailPromotionComponent } from './pages/detail-promotion/detail-promotion.component';
import { ListPromotionComponent } from './pages/list-promotion/list-promotion.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SetPasswordComponent } from './pages/set-password/set-password.component';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { SharedModule } from './modules/shared/shared.module';
import { GradeExamComponent } from './Teacher/pages/grade-exam/grade-exam.component';
import { ExamComponent } from './Teacher/pages/exam/exam.component';

import { UploadImageComponent } from './Student/pages/upload-image/upload-image.component';

import { GradeDisplayComponent } from './Student/pages/grade-display/grade-display.component';
import { GradeListComponent } from './Admin/pages/grade-list/grade-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailPromotionComponent,
    ListPromotionComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
    GradeExamComponent,
    ExamComponent,
    UploadImageComponent,
    GradeDisplayComponent,
    GradeListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    DatePipe,
    {
      provide: LOCALE_ID,
      useValue: 'fr',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
