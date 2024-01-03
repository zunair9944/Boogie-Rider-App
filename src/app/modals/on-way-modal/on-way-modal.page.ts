import { Component, Injector, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CalcenRideModalPage } from '../calcen-ride-modal/calcen-ride-modal.page';
import { CallingPage } from '../calling/calling.page';
import { BasePage } from 'src/app/base.page';
@Component({
  selector: 'app-on-way-modal',
  templateUrl: './on-way-modal.page.html',
  styleUrls: ['./on-way-modal.page.scss'],
})
export class OnWayModalPage extends BasePage implements OnInit {

  data: any;
  isOpen: any = true;
  @Input() takeScreenshot:any;
  @Input() removRoute:any
  @Input() presentHomeModal:any;
  imageBase64:any;
  @Input() notify:any;
  constructor(private inj: Injector,public router: Router, public modalController: ModalController) { super(inj) }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    console.log(this.data)
    this.isOpen = true;
  }

  ionViewDidEnter(): void {
    setTimeout(()=>{
      this.takeScreenshot();
    },3000)
  }

  ionViewWillLeave(): void {
    this.modalController.dismiss();
  }
  async goToChat() {
    this.modalController.dismiss();
    const navExtras: NavigationExtras = {
      state: {
        data: {to_user: this.data.driverData, driver_id: this.data.driver_id, backRoute: '/home'}
      }
    };
    this.cache.store('messenger_id', this.data.driver_id);
    this.router.navigateByUrl('chat', navExtras)
  }

  async confirmCancleRideRequest() {
    const modal = await this.modalController.create({
      component: CalcenRideModalPage,
      cssClass: 'cancelRideModal',
      componentProps: { data: this.data, removRoute: this.removRoute.bind(this),presentHomeModal: this.presentHomeModal.bind(this), notify: this.notify.bind(this) }
    });
    modal.onDidDismiss().then((resp)=>{
      
    })
    return await modal.present();
  }

  async openCallingModal() {
    // const modal = await this.modalController.create({
    //   component: CallingPage,
    //   cssClass: 'callingModal',

    // });
    // modal.onDidDismiss()
    // return await modal.present();
  }
}
