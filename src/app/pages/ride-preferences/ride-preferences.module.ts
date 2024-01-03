import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RidePreferencesPageRoutingModule } from './ride-preferences-routing.module';

import { RidePreferencesPage } from './ride-preferences.page';
import { MODULES } from 'src/app/base.import';

@NgModule({
  imports: [
    MODULES,
    RidePreferencesPageRoutingModule
  ],
  declarations: [RidePreferencesPage]
})
export class RidePreferencesPageModule {}
