import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnWayPage } from './on-way.page';

const routes: Routes = [
  {
    path: '',
    component: OnWayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnWayPageRoutingModule {}
