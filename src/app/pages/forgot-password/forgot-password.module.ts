import { NgModule } from '@angular/core';
import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';
import { MODULES } from 'src/app/base.import';

@NgModule({
  imports: [
    MODULES,
    ForgotPasswordPageRoutingModule
  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}
