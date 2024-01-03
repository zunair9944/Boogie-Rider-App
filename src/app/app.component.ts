import { Component, Injector, ViewChild } from '@angular/core';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { BasePage } from './base.page';
import { HomePage } from './pages/home/home.page';
import { ErrorMessages } from './enum/error-list';
import { NavigationExtras } from '@angular/router';
import { PhotoService } from './services/photo/photo.service';
import { UsersService } from './services/user/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent extends BasePage {
  userInfo:any;
  @ViewChild(HomePage) homepage:any;
  auth_id:any;
  userImage:any = '/assets/icon/user-2.png';
  userName:string;
  constructor(
    private userService: UsersService,
    private photoService: PhotoService,private splashScreen: SplashScreen, injector: Injector) {
    super(injector)
    // this.userInfo = this.cache.get('user_info') || '';
    // if (this.userInfo) {
    //   let data = JSON.parse(this.userInfo);
    //   this.auth_id = data.id;
    // }

    this.userImage = this.cache.get('profile_image') ? this.cache.get('profile_image') : this.userImage;
  }

  ngOnInit(): void {
    this.userService.castUser.subscribe(user=> this.userName = user);
    this.userService.castImg.subscribe(profileImg=> this.userImage = profileImg);
  }

  override ionViewWillEnter() {
   
  }
  editProfile(){
    document.getElementById("signupnave")?.click();
    this.goToLink('/sign-up');
  }

  async updateImage(){
    const  response:any = await this.photoService.addNewToGallery();
    this.userImage = response?.webviewPath;
    if(response?.imageId){
      try{
        const payload = {id: response.imageId}
        const resp:any = await this.apiHelperService.updateImage(payload)
        this.cache.store('profile_image',resp?.data.link);
      }catch(ex:any){
        console.log(ex.error.message)
      }
    }
    
  }

  goToLink(route:any){
    this.modalCtrl.dismiss();
    let navExtras: NavigationExtras = {
      state: {
        data: {backRoute: '/home'}
      }
    };
    if(route == '/sign-up'){
      navExtras = {
        state: {
          data: {id: this.auth_id, backRoute: '/home'}
        }
      };
    }
    this.router.navigateByUrl(route, navExtras)
  }

  async getProfile(){
    try {
      this.loadingService.present();
      const userInfo:any = this.cache.get('user_info') || '';
      const data = {id: userInfo.id}
      const response: any = await this.apiHelperService.getProfile();
      console.log('response', response);
      if(response.status == 'success'){
        this.userInfo = response.data;
        this.loadingService.dismiss();
      }
      if(response.status == 'fail'){
        if(response.status_message_code == 9){
          this.router.navigateByUrl('/account-locked');
        }else if(response.status_message_code == 14){
          this.alertService.presentErrorAlert(response.message)
        }else{
          this.alertService.presentErrorAlert(ErrorMessages[Number(response.status_message_code)])
        }
      }
      
    }
    catch (error:any) {
      console.error('login error', error);
      let errorMessage = error.errorMessageTranslate || (error.response ? error.response.data : (error.message || error));
      this.alertService.presentErrorAlert(errorMessage)
    }
    finally {
      this.loadingService.dismiss(true);
    }
  }
  async logout(){
    this.loadingService.present()
    try{
      
      const resp:any = await this.authService.logout();
      if(resp && resp.status == true){
        this.router.navigateByUrl('/login')
      }else{
        this.alertService.presentErrorAlert(resp.message)
      }
      
    }catch(e:any){
      this.alertService.presentErrorAlert(e['message']);
    }finally{
      this.loadingService.dismiss()
    }
    
  }
}
