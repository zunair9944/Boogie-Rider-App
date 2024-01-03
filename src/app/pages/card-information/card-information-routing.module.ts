import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardInformationPage } from './card-information.page';

const routes: Routes = [
  {
    path: '',
    component: CardInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardInformationPageRoutingModule {}
