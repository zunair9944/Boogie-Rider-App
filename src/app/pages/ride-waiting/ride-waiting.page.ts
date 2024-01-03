import { ChatPage } from './../chat/chat.page';
import { CallingPage } from 'src/app/modals/calling/calling.page';
import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { BasePage } from 'src/app/base.page';
import { NavigationExtras } from '@angular/router';
import { RidewPage } from 'src/app/modals/ridew/ridew.page';
// import { RideWaitingPage } from 'src/app/modals/ride-waiting/ride-waiting.page';

@Component({
  selector: 'app-ride-waiting',
  templateUrl: './ride-waiting.page.html',
  styleUrls: ['./ride-waiting.page.scss'],
})
export class RideWaitingPage extends BasePage {
  isOpen: boolean = true;
  initialBP:any = "0.82";
  // @ViewChild('#rwmodal') modal: ElementRef;
  @ViewChild(IonModal) modal: IonModal;

  constructor(injector:Injector) { super(injector) }
  override ngOnInit(): void {
  }
  override async ionViewWillEnter() {
    this.presentModal();
  }
  override ionViewWillLeave(): void {
    if(this.modalCtrl){
      this.modalCtrl.dismiss();
    }
  }
  
  async openCallingModal() {
    const modal = await this.modalCtrl.create({
      component: CallingPage,
      canDismiss:true,
      cssClass:'callingModal',
      
    });
    modal.onDidDismiss()
    return await modal.present();
  }
  async openChatModal() {
    const modal = await this.modalCtrl.create({
      component: ChatPage,
      canDismiss:true,
      componentProps: {
        goBackRoute: '/ride-waiting'
      },
      cssClass:'callingModal',
      
    });
    modal.onDidDismiss();
    return await modal.present();
    // this.router.navigateByUrl('/chat')
  }

 

  goToChat(){
    const navExtras: NavigationExtras = {
      state: {
        data: {backRoute: '/ride-waiting'}
      }
    };
    this.router.navigateByUrl('/chat', navExtras);
  }
  setOpen(){
    
    !this.isOpen 
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: RidewPage,
      showBackdrop: false,
      initialBreakpoint: 0.82,
      backdropBreakpoint:0.82,
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
