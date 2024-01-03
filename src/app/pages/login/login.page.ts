import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { BasePage } from 'src/app/base.page';
import { ForgotPasswordModalPage } from 'src/app/modals/forgot-password-modal/forgot-password-modal.page';
import { AutguardService } from 'src/app/services/auth/autguard.service';
import { UsersService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage extends BasePage {
  yearValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  splashBgTop = 'assets/icon/orange_bg.svg';
  loginbgCenter = 'assets/icon/blue_bg_login.svg';
  hello = 'assets/icon/hello.svg';
  shakeEffect: boolean = false;
  showLoadingSpin:boolean = false;
  showCnt:any
  show:boolean = false
  loginError:string = '';
  modal:any 
  showSignup:boolean = true;
  override ngForm: FormGroup;
  constructor(
    private userService: UsersService,
    private ref: ChangeDetectorRef,injector: Injector,private Authguardservice: AutguardService) {
    super(injector)
    
  }

  override ngOnInit() {
    this.initForm()
    window.addEventListener('ionKeyboardDidShow', ev => {
      this.showSignup = false;
      // const { keyboardHeight } = ev;
      // Do something with the keyboard height such as translating an input above the keyboard.
    });
    
    window.addEventListener('ionKeyboardDidHide', () => {
      this.showSignup = true;
      // Move input back to original location
    });
  }

  override async ionViewWillEnter(){
    this.showCnt = true;
    if (this.Authguardservice.gettoken()) {  
      this.router.navigateByUrl("/home");  
    }  
    if (history.state.data) {
      this.loginError = history.state.data.error.replace(/<[^>]+>/g, '');
    }
  }
  initForm(){
    this.ngForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  async login() {
    this.ngForm.controls['username'].markAsTouched();
    this.ngForm.controls['password'].markAsTouched();
    this.shakeEffect = false;
    this.submitAttempted = true;
    // this.ngForm.touched;
    if (this.ngForm.valid) {
      try {
        this.showLoadingSpin = true;
        // this.loadingService.present();
        // Step 1 : Check for maintance mode        
        const input = {
          type: 'rider',
          username: this.ngForm.value.username,
          password: this.ngForm.value.password
        };
        console.log('input', input);
        // Step 2 : Login Thru API
        this.loginError = '';
        const response: any = await this.authService.authenticate(input.username, input.password);
        // this.showLoadingSpin = false;
        // this.submitAttempted= false
        console.log('response', response);
        if(response.status == true){
          this.cache.store('token', response.data.api_token);
          this.cache.store('user_info', JSON.stringify(response.data));
          this.cache.store('login_time', new Date());          
          let userName = response?.data?.full_name || 'Rider Name';
          let userImg = response?.data.profile_image || '/assets/icon/user-2.png';
          this.cache.store('userName', userName );
          this.cache.store('profile_image', userImg);
          this.userService.editUserName(userName);
          this.userService.editUserImg(userImg);   
          await this.notify();
          await this.router.navigateByUrl('/home');
          // this.loadingService.dismiss();
        }
        if(response.status == false){
          this.alertService.presentErrorAlert('Sorry, Invalid username/password')
        }
        
      }
      catch (error:any) {
        this.showLoadingSpin = false;
        this.alertService.presentErrorAlert(error.error.message);
      }
      finally {
        this.showLoadingSpin = false;
        this.submitAttempted = false;
        // this.loadingService.dismiss(true);
      }
    }
  }

  onSignUp() {
    const extra: NavigationExtras = {
      state: { nextRoute: 'user-info', backRoute: 'login', isSignUp: true }
    };
    this.router.navigateByUrl('language', extra);
  }

  get f() {
    return this.ngForm.controls;
  }

  async forgotPassword() {
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordModalPage,
      cssClass:'cancelRideModal',
      componentProps: {
        'model_title': "Nomadic model's reveberation"
      }
    });
    modal.onDidDismiss()
    return await modal.present();
  }
  password() {
    this.show = !this.show;
  }

  async notify(){
    try {
      const response: any = await this.apiHelperService.getNotifications();
      console.log('response', response);
      if (response.status == true) {
        let notificationList = response?.data?.list;
        let unreadCount = response?.data?.unreadCount;
        let notifications = {
          list : notificationList,
          unreadCount : unreadCount
        }
        this.cache.store('notifications', JSON.stringify(notifications))
      }
      if (response.status == false) {
        this.alertService.presentErrorAlert('Sorry, failed to get unread notifications')
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
