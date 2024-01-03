import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MODULES } from '../base.import';



export const components = [
  HeaderComponent
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    MODULES
  ],
  exports: [components],
  entryComponents: [
    HeaderComponent
  ]
})
export class ComponentsModule { }