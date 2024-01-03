import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectVehicleModalPage } from './select-vehicle-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SelectVehicleModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectVehicleModalPageRoutingModule {}
