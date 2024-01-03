import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base.page';

@Component({
  selector: 'app-select-vehicle-modal',
  templateUrl: './select-vehicle-modal.page.html',
  styleUrls: ['./select-vehicle-modal.page.scss'],
})
export class SelectVehicleModalPage  extends BasePage {

  constructor(injector:Injector) { super(injector) }
  
  goTo(){
    this.router.navigateByUrl('/ride-waiting')
    this.modalCtrl.dismiss(null, 'cancel');
  }
  
}
