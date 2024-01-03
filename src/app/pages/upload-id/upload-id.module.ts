import { NgModule } from '@angular/core';
import { UploadIdPageRoutingModule } from './upload-id-routing.module';
import { UploadIdPage } from './upload-id.page';
import { MODULES } from 'src/app/base.import';

@NgModule({
  imports: [
    MODULES,
    UploadIdPageRoutingModule
  ],
  declarations: [UploadIdPage]
})
export class UploadIdPageModule {}
