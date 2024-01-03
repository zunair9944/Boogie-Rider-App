import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductResultPage } from './product-result.page';

const routes: Routes = [
  {
    path: '',
    component: ProductResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductResultPageRoutingModule {}
