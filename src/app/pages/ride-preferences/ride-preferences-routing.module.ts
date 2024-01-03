import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RidePreferencesPage } from './ride-preferences.page';

const routes: Routes = [
  {
    path: '',
    component: RidePreferencesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidePreferencesPageRoutingModule {}
