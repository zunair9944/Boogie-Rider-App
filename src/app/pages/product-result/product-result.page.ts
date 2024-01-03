import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base.page';
import { SelectVehicleModalPage } from 'src/app/modals/select-vehicle-modal/select-vehicle-modal.page';

@Component({
  selector: 'app-product-result',
  templateUrl: './product-result.page.html',
  styleUrls: ['./product-result.page.scss'],
})
export class ProductResultPage extends BasePage {

  constructor(injector:Injector) { super(injector) }
  
  override ionViewWillEnter(): void {
    this.presentModal();
  }
  override ionViewWillLeave(): void {
    if(this.modalCtrl){
      this.modalCtrl.dismiss();
    }
  }
  goTo(){
    this.router.navigateByUrl('/ride-waiting')
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: SelectVehicleModalPage,
      showBackdrop: false,
      initialBreakpoint: 0.72,
      backdropBreakpoint:0.72,
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
