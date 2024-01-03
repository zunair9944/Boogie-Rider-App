import { Component, Injector } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BasePage } from 'src/app/base.page';
import { UsersService } from '../../services/user/user.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage extends BasePage {
  notificationList:any = [];
  unreadCount:any = 0;
  showLoadingSpin: boolean = false;
  userImage:any = '/assets/icon/user-2.png';
  constructor(
    private userService: UsersService,
    injector: Injector,
    private modalController: ModalController,
  ) { super(injector) }
  ngOnInit(): void {
    this.userService.castImg.subscribe(profileImg=> this.userImage = profileImg);
  }
  async ionViewWillEnter() {
    let notifications:any = this.cache.get('notifications');
    if(notifications){
      notifications = JSON.parse(notifications);
      this.notificationList = notifications.list;
      this.unreadCount = notifications.unreadCount
    }
    setTimeout(async ()=>{
      await this.getNotifications();
    }, 3000)
  }
  
  async getNotifications(){
    try {
      this.showLoadingSpin = true;
      const payload = {type: 'markas_read'}
      const response: any = await this.apiHelperService.getNotifications(payload);
      console.log('response', response);
      if (response.status == true) {
        this.notificationList = response?.data?.list
        this.unreadCount = response?.data?.unreadCount; 
        this.showLoadingSpin = false;
        let notifications = {
          list : this.notificationList,
          unreadCount : this.unreadCount
        }
        this.cache.store('notifications', JSON.stringify(notifications))
      }
      if (response.status == false) {
        this.showLoadingSpin = false;
        this.alertService.presentErrorAlert('Sorry, failed to get unread notifications')
      }

    }
    catch (error: any) {
      this.showLoadingSpin = false;
      this.alertService.presentErrorAlert(error.error.message);
    }
    finally {
      this.showLoadingSpin = false;
      this.loadingService.dismiss(true);
    }
  }
  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

  getType(type:any = 'notification'){
    switch(type){
      case 'notification':
        return 'Notification'
      case 'new-ride-request':
        return 'New Ride Request'
      case 'cance-ride-request':
        return 'Ride Cancelled'
      case 'ride-request-accepted':
        return 'Ride Accepted'
      case 'ride-request-completed':
        return 'Ride Completed'
      default:
        return 'Notificaiton'
    }
    
  }
}
