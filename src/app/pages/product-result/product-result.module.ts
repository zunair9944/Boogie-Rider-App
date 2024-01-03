import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductResultPageRoutingModule } from './product-result-routing.module';

import { ProductResultPage } from './product-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductResultPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProductResultPage]
})
export class ProductResultPageModule {}
