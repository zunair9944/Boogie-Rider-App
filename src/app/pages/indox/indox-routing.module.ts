import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndoxPage } from './indox.page';

const routes: Routes = [
  {
    path: '',
    component: IndoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndoxPageRoutingModule {}
