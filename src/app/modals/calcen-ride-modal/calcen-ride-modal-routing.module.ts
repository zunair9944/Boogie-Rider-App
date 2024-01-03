import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalcenRideModalPage } from './calcen-ride-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CalcenRideModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalcenRideModalPageRoutingModule {}
