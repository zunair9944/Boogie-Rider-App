import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RideEndPage } from './ride-end.page';

const routes: Routes = [
  {
    path: '',
    component: RideEndPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RideEndPageRoutingModule {}
