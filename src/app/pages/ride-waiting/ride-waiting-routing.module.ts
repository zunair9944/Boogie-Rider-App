import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RideWaitingPage } from './ride-waiting.page';

const routes: Routes = [
  {
    path: '',
    component: RideWaitingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RideWaitingPageRoutingModule {}
