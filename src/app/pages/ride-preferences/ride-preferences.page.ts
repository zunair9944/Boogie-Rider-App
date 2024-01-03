import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BasePage } from 'src/app/base.page';
import { UsersService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-ride-preferences',
  templateUrl: './ride-preferences.page.html',
  styleUrls: ['./ride-preferences.page.scss'],
})
export class RidePreferencesPage extends BasePage {

  signUpError: string = ''
  splashBgBottom = 'assets/icon/bottombg2.svg';
  show: boolean = false;
  showRe: boolean = false;
  showLoadingSpin: boolean = false;
  showCnt = true;
  nextRoute = '/home';
  cardArr:any = [];
  driverPrefArr:any = [];
  musicTypeArr:any = [];
  addMode:any;
  auth_id:any;
  userInfo:any;
  // submitAttempted: boolean = false;
  constructor(
    private userService: UsersService,
    private ref: ChangeDetectorRef,injector: Injector) {
    super(injector)
   }

  override ngOnInit() {
    this.initForm()
  }
  override async ionViewWillEnter(){
    this.showCnt = true;
    this.addMode = true;
    if (history.state.data) {
      this.nextRoute = history.state.data.backRoute;
    }
    this.userInfo = this.cache.get('user_info') || '';
    if (this.userInfo) {
      let data = JSON.parse(this.userInfo);
      this.auth_id = data.id;
      this.addMode = this.auth_id ? false : true;
    }
    let userIfo = this.cache.get('user_info') || ''
    if (userIfo) {
      let data = JSON.parse(userIfo);
      this.auth_id = data.id;
    }
    // this.loadingService.present();
    this.showLoadingSpin = true;
    this.submitAttempted = true;
    await this.getDriverPref();
    await this.getMusicTypes();
    this.showLoadingSpin = false;
    this.submitAttempted = false;
    // this.loadingService.dismiss();
    // this.ref.detectChanges();
    console.log(this.cache.get('register'))
    let registerValues:any = {}
    if(this.cache.get('register') != null){
      registerValues = this.cache.get('register') || ''
      registerValues = this.cache.get('register') ? JSON.parse(registerValues) : null;
      console.log('registerValues....', registerValues)
      if(Object.keys(registerValues).length){
        let ridePrefrences = registerValues.ridePrefrences
        if(ridePrefrences && Object.keys(ridePrefrences).length){
          Object.keys(ridePrefrences).forEach(name => {
            if (this.ngForm.controls[name]) {
              this.ngForm.controls[name].patchValue(ridePrefrences[name]);
            }
          });
        }
        this.cardArr = this.cache.get('cardsArr') || ''
        this.cardArr = this.cache.get('cardsArr') ? JSON.parse(this.cardArr) : null;
      }
    }
    
  }
  async getDriverPref(){
    try {
      // this.loadingService.present();
      let response:any = await this.apiHelperService.getDriverPreferences();
      if(response.status == true){
        this.driverPrefArr = response.data;
      }else{
        this.alertService.presentErrorAlert('Failed to find preferences.')
      }
      // this.loadingService.dismiss();
      return
    }
    catch (error) {
      console.error('login error', error);
    }
    finally {
      // this.loadingService.dismiss(true);
    }
  }
  async getMusicTypes(){
    try {
      // this.loadingService.present();
      let response:any = await this.apiHelperService.getMusics();
      if(response.status == true){
        this.musicTypeArr = response.data;
      }else{
        this.alertService.presentErrorAlert('Failed to find preferences.')
      }
      // this.loadingService.dismiss();
      return
    }
    catch (error) {
      console.error('login error', error);
    }
    finally {
      // this.loadingService.dismiss(true);
    }
  }
  initForm(){
    this.ngForm = this.formBuilder.group({
      // driver_prefrences: new FormControl('', Validators.compose([
      //   Validators.required,
      // ])),
      music: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      card_number: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
  }

  async submit() {
    const input = this.ngForm.value;
    Object.keys(input).forEach(name => {
      if (this.ngForm.controls[name]) {
        this.ngForm.controls[name].markAsTouched();
      }
    });
    
    if (this.ngForm.valid) {
      this.submitAttempted = true;
      // this.showLoadingSpin = true;
      try {
        // this.loadingService.present();
        const input = {
          driver_prefrences: '',//this.ngForm.value.driver_prefrences,
          music: this.ngForm.value.music,
          card: this.ngForm.value.card
        };
        let registerStorage:any = {}
        if(this.cache.get('register') != null){
          registerStorage = this.cache.get('register') || ''
          registerStorage = JSON.parse(registerStorage);
        }
        
        console.log('input', input);
        registerStorage['ridePrefrences'] = input;
        this.cache.store('register', JSON.stringify(registerStorage));
        this.saveUser();
        this.showCnt = false;
        this.ref.detectChanges();
        // this.loadingService.dismiss();
        // this.showLoadingSpin = false;
        
      }
      catch (error) {
        console.error('login error', error);
      }
      finally {
        // this.loadingService.dismiss(true);
        // this.showLoadingSpin = false;
        // this.submitAttempted = false;
      }
    }
  }

  get f() {
    return this.ngForm.controls;
  }
  backRoute(){
    this.showCnt = false;
    this.ref.detectChanges();
    this.router.navigateByUrl('terms-condition')
  }
  goToAddCard(){
    this.router.navigateByUrl('card-information')
  }

  async saveUser(){
    let registerValues:any = {}, userObj:any = {};
    try {
      // this.loadingService.present();
      this.showLoadingSpin = true;
      if(this.cache.get('register') != null){
        registerValues = this.cache.get('register') || ''
        registerValues = this.cache.get('register') ? JSON.parse(registerValues) : null;
        userObj = {...registerValues.basicInfo, ...registerValues.aboutMe, ...registerValues.ridePrefrences}
        userObj['userIdentity'] = registerValues.uploadId.imageId;
        this.cardArr = this.cardArr.map((item:any) => {
          item.default = false;
          if(item.card_number == this.ngForm.value.card_number){
            item.default = true;
          }
          return item;
        })
        userObj['cards'] = JSON.stringify(this.cardArr);//this.cache.get('cardsArr')
        console.log(typeof userObj['cards']);
        if(!this.addMode){
          userObj['id'] = this.auth_id;
          delete userObj['password'];
          delete userObj['retype_password']; 
          let response:any = await this.authService.riderUpdate(userObj);
          if(response && response.status){
            this.cache.store('userName', response?.data?.full_name );
            // this.cache.store('userImg',response?.data.profile_image);
            this.userService.editUserName(response?.data.full_name);
            // this.userService.editUserImg(response?.data.profile_image);
            // this.alertService.presentAlert('Success', 'User information updated successfully.',['Ok']);
            this.toastService.presentToast('top', 'User information updated successfully.')
            this.router.navigateByUrl('home');
          }
          return
        }
        let response:any = await this.authService.register(userObj);
        if(response.status == true){
          this.cache.delete('register');
          this.cache.delete('cardsArr');
          this.alertService.presentAlert('Success', 'Congratulation! Registration process is successfull.',['Ok']);
          this.router.navigateByUrl('/login')
        }else{
          this.alertService.presentErrorAlert('Failed to register.')
        }

      }
    }
    catch (error:any) {
      this.alertService.presentErrorAlert(error.error.message);
    }
    finally {
      // this.loadingService.dismiss(true);
      this.showLoadingSpin = false;
      this.submitAttempted = false;
    }
  }
}
