import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardInformationPageRoutingModule } from './card-information-routing.module';

import { CardInformationPage } from './card-information.page';
import { MODULES } from 'src/app/base.import';

@NgModule({
  imports: [
    MODULES,
    CardInformationPageRoutingModule
  ],
  declarations: [CardInformationPage]
})
export class CardInformationPageModule {}
