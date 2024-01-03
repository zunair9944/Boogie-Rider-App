import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  errorHeader = 'Error!';
  okayButton = 'ok';

  constructor(
    private alertController: AlertController,
    private translate: TranslateService
  ) { }

  async presentAlert(header: string, message: string, buttons: any[]) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
      backdropDismiss: false,
      cssClass: 'alert-box'
    });

    await alert.present();
  }

  dismiss(){;
    this.alertController.dismiss()
  }
  async presentErrorAlert(message: string) {
    this.presentAlert(this.translateByKey(this.errorHeader), message, [this.translateByKey(this.okayButton)]);
  }

  // unable to translate at instantiate & constructor level (via side menu)
  translateByKey(key: string) {
    return this.translate.instant(key);
  }
}
