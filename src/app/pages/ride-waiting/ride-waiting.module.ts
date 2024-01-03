import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RideWaitingPageRoutingModule } from './ride-waiting-routing.module';

import { RideWaitingPage } from './ride-waiting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RideWaitingPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RideWaitingPage]
})
export class RideWaitingPageModule {}
