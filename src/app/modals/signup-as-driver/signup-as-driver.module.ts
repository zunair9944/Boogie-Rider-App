import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupAsDriverPageRoutingModule } from './signup-as-driver-routing.module';

import { SignupAsDriverPage } from './signup-as-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupAsDriverPageRoutingModule
  ],
  declarations: [SignupAsDriverPage]
})
export class SignupAsDriverPageModule {}
