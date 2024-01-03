import { NgModule } from '@angular/core';
import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { MODULES } from 'src/app/base.import';
import { ForgotPasswordModalPage } from 'src/app/modals/forgot-password-modal/forgot-password-modal.page';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    // MODULES,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, ForgotPasswordModalPage]
})
export class LoginPageModule {}
