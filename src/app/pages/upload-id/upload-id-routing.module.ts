import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadIdPage } from './upload-id.page';

const routes: Routes = [
  {
    path: '',
    component: UploadIdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadIdPageRoutingModule {}
