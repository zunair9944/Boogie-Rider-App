import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RideEndPageRoutingModule } from './ride-end-routing.module';

import { RideEndPage } from './ride-end.page';
import { IonRatingStarsModule } from 'ion-rating-stars';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RideEndPageRoutingModule,
    IonRatingStarsModule
  ],
  declarations: [RideEndPage]
})
export class RideEndPageModule { }
