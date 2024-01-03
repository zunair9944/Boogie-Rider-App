import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeDriverPageRoutingModule } from './be-driver-routing.module';

import { BeDriverPage } from './be-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeDriverPageRoutingModule
  ],
  declarations: [BeDriverPage]
})
export class BeDriverPageModule {}
