import { NgModule } from '@angular/core';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { MODULES } from 'src/app/base.import';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    MODULES,
    ChatPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ChatPage]
})
export class ChatPageModule {}
