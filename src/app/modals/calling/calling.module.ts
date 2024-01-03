import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallingPageRoutingModule } from './calling-routing.module';

import { CallingPage } from './calling.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallingPageRoutingModule
  ],
  declarations: [CallingPage]
})
export class CallingPageModule {}
