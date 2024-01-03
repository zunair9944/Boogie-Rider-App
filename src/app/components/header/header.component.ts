import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationsPage } from 'src/app/modals/notifications/notifications.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() bellIcon:any;
  @Input() city: any;
  @Input() loadingcity: any;
  cityName = 'City';
  loadingIcon = true;
  notifyIcon:any = '/assets/icon/bell-nodot.svg';
  constructor(public modalController: ModalController) {}

  ngOnInit() {
  }
  ngOnChanges(){
    this.notifyIcon = this.bellIcon;
    this.cityName = this.city;
    this.loadingIcon = this.loadingcity 
  }
  ionViewWillEnter(){
    // this.notifyIcon = this.bellIcon;
  }

  async openNotifications() {
    this.notifyIcon = '/assets/icon/bell-nodot.svg';
    const modal = await this.modalController.create({
      component: NotificationsPage,
    });
    return await modal.present();
  }

}
