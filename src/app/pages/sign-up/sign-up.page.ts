import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BasePage } from 'src/app/base.page';
import { ConfirmPasswordValidator } from 'src/app/validaors/confirm-password.validator';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage extends BasePage {

  id:any;
  show: boolean = false;
  showRe: boolean = false;
  showLoadingSpin: boolean = false;
  shakeEffect: boolean = false;
  nextRoute = '/about-me';
  backPath = '/home';
  addMode:boolean = true;
  auth_id:any
  userInfo:any
  splashBgBottom = 'assets/icon/bottombg2.svg';
  showSignup: boolean = true;
  constructor(private ref: ChangeDetectorRef,injector: Injector) {
    super(injector)
    window.addEventListener('ionKeyboardDidShow', ev => {
      this.showSignup = false;
      console.log('keyboard opend......')
      // const { keyboardHeight } = ev;
      // Do something with the keyboard height such as translating an input above the keyboard.
    });
    
    window.addEventListener('ionKeyboardDidHide', () => {
      this.showSignup = true;
      console.log('keyboard closed......')
      // Move input back to original location
    });
   }

  override async ngOnInit() {
    
    await this.initForm()
  }
  override async ionViewWillEnter(){
    this.addMode = true;
    if (history.state.data) {
      this.backPath = history.state.data.backRoute;
      // this.nextRoute = this.id ? '/about-me' : history.state.data.backRoute;
    }
    this.userInfo = this.cache.get('user_info') || '';
    if (this.userInfo) {
      let data = JSON.parse(this.userInfo);
      this.auth_id = data.id;
      this.addMode = this.auth_id ? false : true;
    }
    if(!this.addMode){
      this.loadingService.present();
      const response:any = await this.apiHelperService.getProfile();
      this.loadingService.dismiss();
      if(response && response.data){
        let registerData:any = {basicInfo: null, aboutMe: null, uploadId: null, ridePrefrences: null}
        const respData = response.data;
        
        // Basic Info
        const basicInfo = {
          full_name : respData['full_name'],
          email : respData['email'],
          contact_number : respData['contact_number'],
          password : '*******', //respData['password'],
          retype_password : '*******', //respData['password'],
          username : respData['username'],

        }
        registerData.basicInfo = basicInfo;
        // About Me
        const aboutMe = {
          fear : respData.about_me_detail?.fear,
          next_time : respData.about_me_detail?.next_time,
          obsessed_with : respData.about_me_detail?.obessed_with,
          live_without : respData.about_me_detail?.live_without,
          fun_fact : respData.about_me_detail?.fun_fact,
          movie : respData.about_me_detail?.movie,
          next_place : respData.about_me_detail?.next_place

        }
        registerData.aboutMe = aboutMe;

        // User Image
        const uploadId = {
          userIdentity : respData['userIdentity'],
          imageId : respData['userIdentity_id']
        }
        registerData.uploadId = uploadId;
        let selectedCard:any = respData['cards'].filter((item:any) => item.id && item.id == respData.rider_detail['card_id'])
        // Ride Prefrences
        const ridePrefrences = {
          driver_prefrences : respData.rider_detail['driver_preference'],
          music : respData.rider_detail['music_choice'],
          card_number : selectedCard && selectedCard.length ? selectedCard[0].card_number : null

        }
        this.cache.store('cardsArr', JSON.stringify(respData['cards']));
        registerData.ridePrefrences = ridePrefrences;
        this.cache.delete('register');
        this.cache.store('register', JSON.stringify(registerData));
        this.cache.store('addMode', 0);
        this.patchValues(registerData);
      }
      this.addMode = false;
      this.ngForm.get('email')?.clearValidators();
      this.ngForm.get('email')?.updateValueAndValidity();
      this.ngForm.get('username')?.clearValidators();
      this.ngForm.get('username')?.updateValueAndValidity();
      this.ngForm.get('password')?.clearValidators();
      this.ngForm.get('password')?.updateValueAndValidity();
      this.ngForm.get('retype_password')?.clearValidators();
      this.ngForm.get('retype_password')?.updateValueAndValidity();
    }else{
      console.log(this.cache.get('register'))
      let registerValues:any = {}
      if(this.cache.get('register') != null){
        registerValues = this.cache.get('register') || ''
        registerValues = this.cache.get('register') ? JSON.parse(registerValues) : null;
        this.patchValues(registerValues);
      }
    }    
  }
  patchValues(registerValues:any){
    if(registerValues && Object.keys(registerValues).length){
      let loginInfo = registerValues.basicInfo
      if(Object.keys(loginInfo).length){
        Object.keys(loginInfo).forEach(name => {
          if (this.ngForm.controls[name]) {
            this.ngForm.controls[name].patchValue(loginInfo[name]);
          }
        });
      }
    }
  }
  initForm(){
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.com+)*(\.com)$';
    this.ngForm = this.formBuilder.group({
      full_name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      contact_number: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('', [ Validators.minLength(8),Validators.min(8), Validators.required ]),
      retype_password: new FormControl('', [ Validators.minLength(8),Validators.min(8), Validators.required ])
    },
    {
      validator: ConfirmPasswordValidator("password", "retype_password")
    });
  }

  async submit() {
    const input = this.ngForm.value;
    Object.keys(input).forEach(name => {
      if (this.ngForm.controls[name]) {
        this.ngForm.controls[name].markAsTouched();
      }
    });
    this.submitAttempted = true;
    if (this.ngForm.valid) {
      try {
        // this.loadingService.present();
        this.showLoadingSpin = true;
        const input = {
          full_name: this.ngForm.value.full_name,
          username: this.ngForm.value.username,
          email: this.ngForm.value.email,
          contact_number: this.ngForm.value.contact_number,
          password: this.ngForm.value.password,
          retype_password: this.ngForm.value.retype_password
        };
        let registerStorage:any = {}
        if(this.cache.get('register') != null){
          registerStorage = this.cache.get('register') || ''
          registerStorage = JSON.parse(registerStorage);
        }
        
        console.log('input', input);
        registerStorage['basicInfo'] = input;
        this.cache.store('register', JSON.stringify(registerStorage));
        this.ref.detectChanges();
        this.router.navigateByUrl(this.nextRoute);
        // this.loadingService.dismiss();
        this.showLoadingSpin = false;
      }
      catch (error) {
        console.error('login error', error);
        // let errorMessage = error.errorMessageTranslate || (error.response ? error.response.data : (error.message || error));
      }
      finally {
        this.loadingService.dismiss(true);
      }
    }
  }

  get f() {
    return this.ngForm.controls;
  }
  password() {
    this.show = !this.show;
  }
  rePassword() {
    this.showRe = !this.showRe;
  }
  backRoute(){
    this.router.navigateByUrl(this.backPath);
  }

}
