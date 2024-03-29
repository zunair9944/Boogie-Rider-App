import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  constructor(
    private modalController: ModalController,
  ) { }
  ngOnInit() { }
  async closeChatModel() {
    await this.modalController.dismiss(close);
  }

}
