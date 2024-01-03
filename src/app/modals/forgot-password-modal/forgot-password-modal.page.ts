import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BasePage } from 'src/app/base.page';
import { RideEndPage } from '../ride-end/ride-end.page';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.page.html',
  styleUrls: ['./forgot-password-modal.page.scss'],
})
export class ForgotPasswordModalPage extends BasePage {
  modelData: any;
  shakeEffect: boolean = false;
  showLoadingSpin = false;
  @Input() model_title: string;
  constructor(
    injector: Injector,
    private modalController: ModalController,
  ) { super(injector) }
  override ngOnInit() { this.initForm() }
  initForm(){
    this.ngForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }
  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

  async openIonModal() {
    const modal = await this.modalController.create({
      component: RideEndPage,
      cssClass:'cancelRideModal',
      componentProps: {
        'model_title': "Nomadic model's reveberation"
      }
    });
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        this.modelData = modelData.data;
        console.log('Modal Data : ' + modelData.data);
      }
      
    });
    return await modal.present();
    
  }

  async submit(){
    this.ngForm.controls['email'].markAsTouched();
    this.shakeEffect = false;
    this.submitAttempted = true;
    // this.ngForm.touched;
    if (this.ngForm.valid) {
      try {
        // this.loadingService.present();
        this.showLoadingSpin = true;
        // Step 1 : Check for maintance mode        
        const input = {
          email: this.ngForm.value.email
        };
        console.log('input', input);
        // Step 2 : Login Thru API
        const response: any = await this.apiHelperService.getOTP(input);
        this.showLoadingSpin = false;
        console.log('response', response);
        if(response.status == true){
          // this.loadingService.dismiss();
          this.closeModel();
          this.alertService.presentAlert('Alert', response.message, ['OK'])
          setTimeout(()=>{
            this.router.navigateByUrl('/forgot-password');
          }, 1000)
        }
        if(response.status == false){
          this.alertService.presentErrorAlert('Sorry, Couldn\'t find ane user with given email Id.')
        }
        
      }
      catch (error:any) {
        this.alertService.presentErrorAlert(error.error.message);
        // console.log(error.response.status)
      }
      finally {
        // this.loadingService.dismiss(true);
        this.showLoadingSpin = false;
      }
    }
  }

  get f() {
    return this.ngForm.controls;
  }
}
