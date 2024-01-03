import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalcenRideModalPageRoutingModule } from './calcen-ride-modal-routing.module';

import { CalcenRideModalPage } from './calcen-ride-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalcenRideModalPageRoutingModule
  ],
  declarations: [CalcenRideModalPage]
})
export class CalcenRideModalPageModule {}
