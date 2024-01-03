import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-choose-pic-modal',
  templateUrl: './choose-pic-modal.page.html',
  styleUrls: ['./choose-pic-modal.page.scss'],
})
export class ChoosePicModalPage implements OnInit {

  @Input() model_title: string;
  constructor(
    private modalController: ModalController,
  ) { }
  ngOnInit() { }
  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

}
