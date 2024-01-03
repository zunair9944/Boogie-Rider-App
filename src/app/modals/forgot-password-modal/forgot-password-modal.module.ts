import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordModalPageRoutingModule } from './forgot-password-modal-routing.module';

import { ForgotPasswordModalPage } from './forgot-password-modal.page';
import { MODULES } from 'src/app/base.import';

@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    // IonicModule,
    MODULES,
    ForgotPasswordModalPageRoutingModule
  ],
  declarations: [ForgotPasswordModalPage]
})
export class ForgotPasswordModalPageModule {}
