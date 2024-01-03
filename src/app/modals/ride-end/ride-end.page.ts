import { Component, Injector, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BasePage } from 'src/app/base.page';

@Component({
  selector: 'app-ride-end',
  templateUrl: './ride-end.page.html',
  styleUrls: ['./ride-end.page.scss'],
})
export class RideEndPage extends BasePage implements OnInit {

  @Input() presentHomeModal:any;
  data: any;
  tip: string = '';
  customTip: string;
  isCustomTip: boolean = false;
  rating: any = 0;
  comment: string = '';
  showLoadingSpin: boolean = false;
  constructor(
    private modalController: ModalController,
    private injector: Injector
  ) { super(injector)}

  ngOnInit() {
    this.rating = this.data.driverData.ratings
  }

  handleOnChangeCustomTip(e: any) {
    this.customTip = e.target.value;
    this.isCustomTip = true;
  }

  rateDriver(e: any) {
    this.rating = e;
  }

  async handleRatingTip() {
    try{
      const tip = (this.isCustomTip) ? this.customTip : this.tip;
      console.log("==>", tip, this.rating, this.comment);
      console.log("==>", this.data);
      const payload = { tip: tip, rating: this.rating, comment: this.comment, rider_id: this.data.rider_id, driver_id: this.data.driver_id, ride_request_id: this.data.requestId }
      this.submitAttempted = true
      this.showLoadingSpin = true;
      await this.apiHelperService.saveRating(payload);
      this.submitAttempted = false;
      this.showLoadingSpin = true;
      this.modalCtrl.dismiss({isEnded: true})
    }catch(ex:any){
      this.alertService.presentErrorAlert(ex.error.message)
    }
    
    // await this.modalController.dismiss();
  }

  selectTip(element: any, value: any) {
    this.isCustomTip = false;
    document.querySelectorAll('.box').forEach(function (ele) {
      ele.classList.remove("active-box");
    });
    element.currentTarget.classList.add('active-box');
    this.tip = value;
  }
}
