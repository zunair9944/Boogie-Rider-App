import { Component, Injector, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { BasePage } from 'src/app/base.page';
import { CallingPage } from '../calling/calling.page';
import { ModalController } from '@ionic/angular';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { OnWayModalPage } from '../on-way-modal/on-way-modal.page';
import { CalcenRideModalPage } from '../calcen-ride-modal/calcen-ride-modal.page';

@Component({
  selector: 'app-ridew',
  templateUrl: './ridew.page.html',
  styleUrls: ['./ridew.page.scss'],
})
export class RidewPage extends BasePage {

  @Input() data: any;
  @Input() presentHomeModal:any
  @Input() removRoute:any;
  @Input() notify:any;
  constructor(public injector: Injector, private modalController: ModalController, private callNumber: CallNumber) { super(injector) }

  ngOnInit() {
    console.log("-->", this.data);
  }
  // goToChat() {
  //   const navExtras: NavigationExtras = {
  //     state: {
  //       data: { backRoute: '/ride-waiting' }
  //     }
  //   };
  //   this.router.navigateByUrl('/chat', navExtras);
  // }

  async goToChat() {
    const navExtras: NavigationExtras = {
      state: {
        data: {to_user: this.data.driverData, driver_id: this.data.driver_id, backRoute: '/home'}
      }
    };
    this.cache.store('messenger_id', this.data.driver_id);
    this.router.navigateByUrl('chat', navExtras)
  }
  async callDriver(number: string) {
    await this.callNumber.callNumber(number, true)
      .then(r => console.log('Launched dialer!', r))
      .catch(e => console.log('Error launching dialer', e));
  }

  async handleCancleDriver() {
    const modal = await this.modalController.create({
      component: CalcenRideModalPage,
      cssClass: 'cancelRideModal',
      componentProps: { data: this.data, removRoute: this.removRoute.bind(this),presentHomeModal: this.presentHomeModal.bind(this), notify: this.notify. bind(this) }
    });
    modal.onDidDismiss().then((resp)=>{
      
    })
    return await modal.present();
    // this.modalController.dismiss({showHomeModal: true});
    // const modalRiderCancleRequest = await this.modalController.create({
    //   component: OnWayModalPage,
    //   showBackdrop: false,
    //   initialBreakpoint: 0.32,
    //   backdropBreakpoint: 0.32,
    //   breakpoints: [0.82, 0.25],
    //   handleBehavior: 'cycle',
    //   backdropDismiss: false,
    //   cssClass: 'modalMain',
    //   id: 'riderCancleRequestModal',
    //   componentProps: { data: this.data, removRoute: this.removRoute.bind(this), presentHomeModal: this.presentHomeModal.bind(this) }
    // });
    // modalRiderCancleRequest.onDidDismiss().then((resp)=>{
    // });
    // return await modalRiderCancleRequest.present();
  }
}