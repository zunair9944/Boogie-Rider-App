import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutMePageRoutingModule } from './about-me-routing.module';

import { AboutMePage } from './about-me.page';
import { MODULES } from 'src/app/base.import';

@NgModule({
  imports: [
    MODULES,
    AboutMePageRoutingModule
  ],
  declarations: [AboutMePage]
})
export class AboutMePageModule {}
