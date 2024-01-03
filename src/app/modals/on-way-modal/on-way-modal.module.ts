import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnWayModalPageRoutingModule } from './on-way-modal-routing.module';

import { OnWayModalPage } from './on-way-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnWayModalPageRoutingModule
  ],
  declarations: [OnWayModalPage]
})
export class OnWayModalPageModule {}
