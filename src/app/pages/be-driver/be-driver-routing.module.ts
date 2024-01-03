import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeDriverPage } from './be-driver.page';

const routes: Routes = [
  {
    path: '',
    component: BeDriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeDriverPageRoutingModule {}
