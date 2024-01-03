import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BasePage } from 'src/app/base.page';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.page.html',
  styleUrls: ['./customer-service.page.scss'],
})
export class CustomerServicePage extends BasePage {

  error: string = ''
  splashBgBottom = 'assets/icon/bottombg2.svg';
  showLoadingSpin: boolean = false;
  nextRoute = '/home';
  auth_id:any;
  constructor(private callNumber: CallNumber, private ref: ChangeDetectorRef,injector: Injector) {
    super(injector)
    let userIfo = this.cache.get('user_info') || ''
    if (userIfo) {
      let data = JSON.parse(userIfo);
      this.auth_id = data.id;
    }
   }

  override ngOnInit() {
    this.initForm()
  }
  override ionViewWillEnter(){
    
  }
  initForm(){
    this.ngForm = this.formBuilder.group({
      message: new FormControl('', Validators.compose([
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
      try {
        this.submitAttempted = true;
        this.showLoadingSpin = true;
        this.loadingService.present();
        const payload = {
          message: this.ngForm.value.message,
          id: this.auth_id
        };
        const response:any = await this.apiHelperService.contactSupport(payload);
        if(response && response.status){
          this.alertService.presentAlert("Success!", 'Your message send to support', ["OK"]);
          setTimeout(()=>{
            this.alertService.dismiss();
          },1500);
        }
        this.router.navigateByUrl(this.nextRoute);
        this.loadingService.dismiss();
        
      }
      catch (error) {
        this.showLoadingSpin = false;
        console.error('login error', error);
        // let errorMessage = error.errorMessageTranslate || (error.response ? error.response.data : (error.message || error));
      }
      finally {
        this.showLoadingSpin = false;
        this.loadingService.dismiss(true);
      }
    }
  }

  get f() {
    return this.ngForm.controls;
  }

  async call(number: string) {
    console.log('calling..' + number);

    await this.callNumber.callNumber(number, true)
      .then(r => console.log('Launched dialer!', r))
      .catch(e => console.log('Error launching dialer', e));
  }
}
