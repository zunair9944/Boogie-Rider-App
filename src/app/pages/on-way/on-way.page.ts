import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController ,AnimationController} from '@ionic/angular';
import { CalcenRideModalPage } from 'src/app/modals/calcen-ride-modal/calcen-ride-modal.page';
import { CallingPage } from 'src/app/modals/calling/calling.page';
import { OnWayModalPage } from 'src/app/modals/on-way-modal/on-way-modal.page';

@Component({
  selector: 'app-on-way',
  templateUrl: './on-way.page.html',
  styleUrls: ['./on-way.page.scss'],
})
export class OnWayPage implements OnInit {

  modelData: any;
  isOpen:any = true;
  constructor(public router: Router,public modalController: ModalController) {}

  ngOnInit() {
  }

  async ionViewWillEnter(){
    // this.isOpen = true;
    this.presentModal();
  }

  ionViewWillLeave(): void {
    this.modalController.dismiss();
  }
  goToChat(){
    const navExtras: NavigationExtras = {
      state: {
        data: {backRoute: '/on-way'}
      }
    };
    this.router.navigateByUrl('/chat', navExtras);
  }
  
  async openIonModal() {
    const modal = await this.modalController.create({
      component: CalcenRideModalPage,
      cssClass:'cancelRideModal',
      componentProps: {
        'model_title': "Nomadic model's reveberation"
      }
    });
    modal.onDidDismiss()
    return await modal.present();
  }

  async openCallingModal() {
    const modal = await this.modalController.create({
      component: CallingPage,
      cssClass:'callingModal',
      
    });
    modal.onDidDismiss()
    return await modal.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: OnWayModalPage,
      showBackdrop: false,
      initialBreakpoint: 0.32,
      backdropBreakpoint:0.32,
      breakpoints: [0.82, 0.25],
      handleBehavior: 'cycle',
      backdropDismiss: false,
      cssClass:'modalMain',
      id: 'rwmodal'
    });
    modal.onDidDismiss();
    return await modal.present();
  }

}
