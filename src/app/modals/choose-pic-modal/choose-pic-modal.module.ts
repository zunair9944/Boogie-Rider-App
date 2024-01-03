import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoosePicModalPageRoutingModule } from './choose-pic-modal-routing.module';

import { ChoosePicModalPage } from './choose-pic-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoosePicModalPageRoutingModule
  ],
  declarations: [ChoosePicModalPage]
})
export class ChoosePicModalPageModule {}
