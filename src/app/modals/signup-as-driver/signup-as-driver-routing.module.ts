import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupAsDriverPage } from './signup-as-driver.page';

const routes: Routes = [
  {
    path: '',
    component: SignupAsDriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupAsDriverPageRoutingModule {}
