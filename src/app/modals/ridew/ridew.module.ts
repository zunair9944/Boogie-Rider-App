import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RidewPageRoutingModule } from './ridew-routing.module';

import { RidewPage } from './ridew.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RidewPageRoutingModule
  ],
  declarations: [RidewPage]
})
export class RidewPageModule {}
