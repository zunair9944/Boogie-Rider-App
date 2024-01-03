import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(position: 'top' | 'middle' | 'bottom', message:any) {
    const toast = await this.toastController.create({
      message:  message,
      duration: 1500,
      position: position
    });

    await toast.present();
  }
}
