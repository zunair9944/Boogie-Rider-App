import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { BasePage } from 'src/app/base.page';
import { ChoosePicModalPage } from 'src/app/modals/choose-pic-modal/choose-pic-modal.page';
import { PhotoService } from 'src/app/services/photo/photo.service';
@Component({
  selector: 'app-upload-id',
  templateUrl: './upload-id.page.html',
  styleUrls: ['./upload-id.page.scss'],
})
// export class UploadIdPage {
//   modelData: any;
//   constructor(public modalController: ModalController) {}
export class UploadIdPage extends BasePage {

  modelData:any;
  signUpError: string = ''
  splashBgBottom = 'assets/icon/bottombg2.svg';
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  show: boolean = false;
  showRe: boolean = false;
  showLoadingSpin: boolean = false;
  showCnt = true;
  nextRoute = '/ride-preferences';
  imgURL:any = '/assets/icon/nic.png';
  addMode:any;
  constructor(private photoService: PhotoService,private ref: ChangeDetectorRef,injector: Injector, private chooser: Chooser) {
    super(injector)
   }

  override ngOnInit() {
    this.initForm()
  }
  override ionViewWillEnter(){
    let addMode:any = this.cache.get('addMode');
    if(addMode != null){
      this.addMode = addMode == "0" ? false : true;
    }
    this.showCnt = true
    if (history.state.data) {
      this.nextRoute = history.state.data.backRoute;
    }
    // console.log(this.cache.get('register'))
    let registerValues:any = {}
    if(this.cache.get('register') != null){
      registerValues = this.cache.get('register') || ''
      registerValues = this.cache.get('register') ? JSON.parse(registerValues) : null;
      
      this.ngForm.setValue({'userIdentity': null});
      if(registerValues && Object.keys(registerValues).length){
        let uploadId = registerValues.uploadId
        console.log('uploadId....', uploadId)
        if(uploadId && Object.keys(uploadId).length){
          this.ngForm.controls['userIdentity'].patchValue(uploadId['imageId']);
        }
        if(this.ngForm.value.userIdentity){
          this.imgURL = uploadId['userIdentity'];
        }
      }
    }
  }
  initForm(){
    this.ngForm = this.formBuilder.group({
      userIdentity: new FormControl('', Validators.compose([
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
    this.submitAttempted = true;
    if (this.ngForm.valid) {
      try {
        // this.loadingService.present();
        this.showLoadingSpin = true;
        let input = {
          userIdentity: this.ngForm.value.userIdentity
        };
        let registerStorage:any = {}
        let uploadId:any;
        if(this.cache.get('register') != null){
          registerStorage = this.cache.get('register') || ''
          registerStorage = JSON.parse(registerStorage);
          uploadId = registerStorage.uploadId
        }
        
        console.log('input', input);
        const data = {
          imageId: this.ngForm.value.userIdentity,
          userIdentity: this.imgURL
        }
        registerStorage['uploadId'] = data;
        this.cache.store('register', JSON.stringify(registerStorage));
        this.showCnt = false;
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
        this.showLoadingSpin = false;
      }
    }
  }

  get f() {
    return this.ngForm.controls;
  }
  backRoute(){
    this.ref.detectChanges();
    this.router.navigateByUrl('terms-condition')
  }
  
  async upload(){
  const  response:any = await this.photoService.addNewToGallery();
  this.imgURL = response?.webviewPath;
  this.ngForm.setValue({'userIdentity': response?.imageId});
  //   this.chooser.getFile()
  // .then((file:any) => {
  //   console.log('line 115 test.....')
  //   console.log(file?.mediaType)
  //   let allowedTypes:any = ['image/jpg','image/jpeg','image/gif', 'image/png','pdf']
  //   if(allowedTypes.indexOf(file?.mediaType) == -1){
  //     this.alertService.presentErrorAlert('Invalid Format, Only allowed png, jpg, jpeg, pdf');
  //     this.ngForm.setValue({'userIdentity': null});
  //     return;
  //   }
    
  //   console.log(file?.dataURI)
  //   this.imgURL = file?.dataURI;
  //   this.ngForm.setValue({'userIdentity': file?.dataURI});
  //   console.log(file ? file.name : 'canceled')
  // })
  // .catch((error: any) => console.error(error));
  
  }
  async openIonModal() {
    const modal = await this.modalCtrl.create({
      component: ChoosePicModalPage,
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

}
