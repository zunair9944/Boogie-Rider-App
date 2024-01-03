import { Component, Injector, OnInit ,ViewChild} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { BasePage } from 'src/app/base.page';
import { Fields } from 'src/app/common/fields.interface';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage extends BasePage {
  @ViewChild('code_0') code0: IonInput;
  @ViewChild('code_1') code1: IonInput;
  @ViewChild('code_2') code2: IonInput;
  @ViewChild('code_3') code3: IonInput;
  @ViewChild('code_4') code4: IonInput;
  @ViewChild('code_5') code5: IonInput;
  otpMissingErr: boolean = false;
  isCodeValid: boolean = false;
  resultReturn: boolean = false;
  showLoadingSpin: boolean = false;
  show: boolean = false;
  showRe:boolean = false  
  // timeLeftDefault: number = 60;
  // timeLeft: number = this.timeLeftDefault;
  // interval: any;
  // continueDisable: boolean = false;
  // resendDisable: boolean = true;

  constructor(injector: Injector) {
    super(injector)
  }

  override ngOnInit() {
    this.initForm()
  }

  override ionViewWillEnter(){
    
  }
  
  // startTimer() {
  //   this.interval = setInterval(() => {
  //     if (this.timeLeft > 0) {
  //       this.timeLeft--;
  //     } else {
  //       // @todo what to do when time runs out
  //       this.resendDisable = false;
  //       this.continueDisable = true;
  //       // console.log('timeout');
  //       this.timeLeft = 0;
  //     }
  //   }, 1000);
  // }

  fields: Array<string> = ['code_0', 'code_1', 'code_2', 'code_3', 'code_4', 'code_5', 'password', 'retype_password'];

  initForm() {
    const obj: Fields = {};
    this.fields.forEach(field => {
      switch (field) {
        case 'email':
          obj[field] = new FormControl('', [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
          ])
          break;
        case 'password':
          obj[field] = new FormControl('', [ Validators.minLength(6),Validators.min(6), Validators.required ])
            break;
        case 'retype_password':
          obj[field] = new FormControl('', [ Validators.minLength(6),Validators.min(6), Validators.required ])
            break;
        default:
          obj[field] = new FormControl('', Validators.required)
          break;
      }
    });
    this.ngForm = this.formBuilder.group(obj);
  }
  // initForm(){
  //   this.ngForm = this.formBuilder.group({
  //     otp1: new FormControl(''),
  //     otp2: new FormControl(''),
  //     otp3: new FormControl(''),
  //     otp4: new FormControl(''),
  //     password: new FormControl('', [ Validators.minLength(6),Validators.min(6), Validators.required ]),
  //     retype_password: new FormControl('', [ Validators.minLength(6),Validators.min(6), Validators.required ])
  //   });
  // }

  async submit() {
    let otpCode = '';
    this.fields.forEach(field => {
      this.ngForm.controls[field].markAsTouched();
      this.ngForm.controls[field].markAsDirty();
      if(!(field == 'password' || field == 'retype_password'))
        otpCode += this.ngForm.value[field];
    });
    this.submitAttempted = true;
    if (this.ngForm.valid) {
      try {
        this.showLoadingSpin = true;
        // Step 1 : Check for maintance mode 
        const input = {
          otp: otpCode,
          password: this.ngForm.value.password,
          password_confirmation: this.ngForm.value.retype_password
        };
        console.log('input', input);
        // Step 2 : Login Thru API
        const response: any = await this.authService.changePassword(input);
        console.log('response', response);
        this.showLoadingSpin = false;
        if(response.status == true){
          this.isCodeValid = true;
          this.alertService.presentAlert('Success', response.message ,['Ok'])
          this.router.navigateByUrl('/login');
        }
        if(response.status == false){
          this.alertService.presentErrorAlert(response.message)
        }
        
      }
      catch (error:any) {
        this.showLoadingSpin = false;
        this.resultReturn = true;
        this.alertService.presentErrorAlert(error.error.message);
        // console.log(error.response.status)
      }
      finally {
        this.showLoadingSpin = false;
      }
    }
  }
  
  override goBack(){
    this.router.navigateByUrl('/login')
  }


  handleKeyUp(event: any) {
    const name = event.target.name;
    if (event.key !== 'Tab') {
      switch (name) {
        case 'code_0':
          this.code1.setFocus()
          break;
        case 'code_1':
          this.code2.setFocus()
          break;
        case 'code_2':
          this.code3.setFocus()
          break;
        case 'code_3':
          this.code4.setFocus()
          break;
        case 'code_4':
          this.code5.setFocus()
          break;

        default:
          break;
      }
    }

  }

  handleKeyDown(event: any) {
    if (event.target.value.length == 1) return false;
    return event;
  }
  get f() {
    return this.ngForm.controls;
  }

  getClassOfCode(f: any, key: string) {
    let style = '';
    if ((f[key].dirty && f[key].touched && f[key].errors)) {
      style = "has-error";
    }
    else if (this.isCodeValid === false && this.resultReturn === true) {
      style = "invalid-code";
    }
    else if (this.isCodeValid === true && this.resultReturn === true) {
      style = "valid-code";
    }
    return style;
  }

  password() {
    this.show = !this.show;
  }

  rePassword() {
    this.showRe = !this.showRe;
  }
}
