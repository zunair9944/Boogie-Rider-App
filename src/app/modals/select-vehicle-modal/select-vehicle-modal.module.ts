import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectVehicleModalPageRoutingModule } from './select-vehicle-modal-routing.module';

import { SelectVehicleModalPage } from './select-vehicle-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectVehicleModalPageRoutingModule
  ],
  declarations: [SelectVehicleModalPage]
})
export class SelectVehicleModalPageModule {}
