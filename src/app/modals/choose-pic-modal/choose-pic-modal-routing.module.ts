import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoosePicModalPage } from './choose-pic-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ChoosePicModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoosePicModalPageRoutingModule {}
