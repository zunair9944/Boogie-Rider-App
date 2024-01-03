import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading = false;

  constructor(private loadingController: LoadingController) { }

  isLoadingStatus() {
    return this.isLoading;
  }

  async present(optsOrMessage?: LoadingOptions | string) {
    const opts = typeof optsOrMessage === 'string' ? { message: optsOrMessage } : optsOrMessage;
    this.isLoading = true;
    return await this.loadingController.create(opts).then(htmlIonLoadingElement => {
      htmlIonLoadingElement.present().then(() => {
        if (!this.isLoading) {
          htmlIonLoadingElement.dismiss().then(() => {
            console.log('abort presenting');
          });
        }
      });
      return htmlIonLoadingElement;
    });
  }

  async dismiss(hideError: boolean = false) {
    this.isLoading = false;
    try {
      return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    }
    catch (e) {
      if (!hideError) {
        console.log('dismiss loading controller:', e);
      }
      return null;
    }
  }
}
