import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RidewPage } from './ridew.page';

const routes: Routes = [
  {
    path: '',
    component: RidewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidewPageRoutingModule {}
