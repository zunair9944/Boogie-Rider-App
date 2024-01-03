import { NgModule } from '@angular/core';
import { OnWayPageRoutingModule } from './on-way-routing.module';

import { OnWayPage } from './on-way.page';
import { MODULES } from 'src/app/base.import';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    MODULES,
    ComponentsModule,
    OnWayPageRoutingModule
  ],
  declarations: [OnWayPage]
})
export class OnWayPageModule {}
