import { Component, Injector, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiHelperService } from 'src/app/services/api/api-helper.service';
import { RideEndPage } from '../ride-end/ride-end.page';
import { BasePage } from 'src/app/base.page';

@Component({
  selector: 'app-calcen-ride-modal',
  templateUrl: './calcen-ride-modal.page.html',
  styleUrls: ['./calcen-ride-modal.page.scss'],
})
export class CalcenRideModalPage extends BasePage implements OnInit {
  data: any;
  @Input() presentHomeModal:any;
  @Input() removRoute:any;
  @Input() notify:any;
  showLoadingSpin: boolean = false;
  constructor(
    private injector: Injector,
    private modalController: ModalController,
    private apiService: ApiHelperService
  ) {  super(injector)}
  ngOnInit() { }
  async closeModel() {
    await this.modalController.dismiss();
  }

  async handleCancleRideRequest() {
    
    try {
      this.submitAttempted = true;
      this.submitAttempted = true;
      this.showLoadingSpin = true;
      const response: any = await this.apiService.cancleRideRequest({ ride_request_id: this.data.requestId, cancel_by: 'rider' });
      this.submitAttempted = false;
      this.showLoadingSpin = false;
      console.log('response', response);
      if (response.status == true) {
        this.removRoute();
        this.notify();
        response.data;
        console.log(response.data);
        this.modalController.dismiss({showHomeModal: true}, '', "riderCancleRequestModal");
        this.modalController.dismiss({showHomeModal: true});

        const modal = await this.modalController.create({
          component: RideEndPage,
          cssClass: 'cancelRideModal',
          componentProps: { data: this.data, presentHomeModal: this.presentHomeModal.bind(this) }
        });
        modal.onDidDismiss().then((resp)=>{
          // if(resp.data && resp.data.isEnded){
            this.presentHomeModal();
          // }
        });
        return await modal.present();
      }

    }
    catch (e: any) {
      this.alertService.presentErrorAlert(e.error.message)

    }
    finally {
      this.submitAttempted = false;
    }

  }

}
