import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndoxPageRoutingModule } from './indox-routing.module';

import { IndoxPage } from './indox.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndoxPageRoutingModule,
    ComponentsModule
  ],
  declarations: [IndoxPage]
})
export class IndoxPageModule {}
