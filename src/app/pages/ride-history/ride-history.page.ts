import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base.page';

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.page.html',
  styleUrls: ['./ride-history.page.scss'],
})
export class RideHistoryPage extends BasePage {
  auth_id:any;
  rideList:any = [];
  constructor(injector: Injector) { 
    super(injector)
    let userIfo = this.cache.get('user_info') || ''
    if (userIfo) {
      let data = JSON.parse(userIfo);
      this.auth_id = data.id;
    }
  }

  override ngOnInit() {
  }
  override ionViewWillEnter(): void {
    this.getRideHistory();
    if(this.modalCtrl){
      this.modalCtrl.dismiss();
    }
  }

  async getRideHistory() {
    try {
      this.loadingService.present();
      const payload = {user_id: this.auth_id, type: 'rider'}
      const response: any = await this.apiHelperService.getRideHistory(payload);
      console.log('response', response);
      if (response.status == true) {
        this.rideList = response.data;
        this.loadingService.dismiss();
      }
      if (response.status == false) {
        this.alertService.presentErrorAlert('Sorry, Invalid username/password')
      }

    }
    catch (error: any) {
      this.alertService.presentErrorAlert(error.error.message);
    }
    finally {
      this.loadingService.dismiss(true);
    }
  }
}
