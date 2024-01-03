import { OnInit, Injector, ViewChild, NgZone, Component } from '@angular/core';
import { ModalController, NavController, MenuController, LoadingController, Config, IonContent } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalOptions } from '@ionic/core';
import { Location } from '@angular/common';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { LoadingService } from './services/loading/loading.service' //'../services/loading/loading.service';
import { AuthService } from './services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ApiHelperService } from './services/api/api-helper.service';
import { CacheHelperService } from './services/cache/cache-helper.service';
import { AlertService } from './services/alert/alert.service';
import { PhotoService } from './services/photo/photo.service';
import { ToastService } from './services/toast/toast.service';

@Component({
  template: ''
})
export class BasePage implements OnInit {
  @ViewChild(IonContent) ionContent: IonContent;

  config: Config;
  apiHelperService:ApiHelperService;
  loading: HTMLIonLoadingElement;
  loadingService: LoadingService;
  loadingCtrl: LoadingController;
  router: Router;
  modalCtrl: ModalController;
  formBuilder: FormBuilder;
  navCtrl: NavController;
  menuCtrl: MenuController;
  location: Location;
  platform: Platform;
  ngZone: NgZone;
  authService: AuthService
  translate: TranslateService;
  cache: CacheHelperService;
  // shows error if submitAttempted is true
  submitAttempted = false;
  locale: string;
  ngForm: FormGroup;
  isCashPinUp = false;
  alertService: AlertService;
  toastService: ToastService;
  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.modalCtrl = injector.get(ModalController);
    this.formBuilder = injector.get(FormBuilder);
    this.navCtrl = injector.get(NavController);
    this.menuCtrl = injector.get(MenuController);
    this.loadingCtrl = injector.get(LoadingController);
    this.location = injector.get(Location);
    this.platform = injector.get(Platform);
    this.ngZone = injector.get(NgZone);
    this.config = injector.get(Config);
    this.loadingService = injector.get(LoadingService);
    // this.config.set('hardwareBackButton', false);
    this.authService = injector.get(AuthService);
    this.translate = injector.get(TranslateService);
    this.apiHelperService = injector.get(ApiHelperService);
    this.cache = injector.get(CacheHelperService)
    this.alertService = injector.get(AlertService)
    this.toastService = injector.get(ToastService)
    // Prepand child's ionViewWillEnter with parent's ionViewWillEnter (preIonViewWillEnter)
    const childIonViewWillEnter = this.ionViewWillEnter;
    this.ionViewWillEnter = () => {
      this.preIonViewWillEnter();
      childIonViewWillEnter.apply(this);
    };
  }

  ionViewWillEnter() { }

  // Don't override this method
  private preIonViewWillEnter() {
  }

  ngOnInit(): void {
  }

  ionViewDidEnter() {
  }

  /** Resets page's scroll back to top when leaving. */
  ionViewWillLeave() {
    if (this.ionContent) {
      this.ionContent.scrollToTop(0);
    }
  }

  async openModal(modalOptions: ModalOptions, context: any, onDidDismissFn?: Function) {
    const modal: HTMLIonModalElement = await this.modalCtrl.create(modalOptions);
    if (onDidDismissFn) {
      modal.onDidDismiss().then(response => {
        onDidDismissFn.apply(context, [response]);
      });
    }
    await modal.present();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message: message
    });
    await this.loading.present();
  }

  async dismissLoading() {
    await this.loading.dismiss();
    console.log('Loading dismissed!');
  }

  async executeWithLoading(message: string, task: Function) {
    await this.presentLoading(message).then(() => task.apply(this)).finally(() => this.dismissLoading());
  }

  crashReport(clientId: string, currentPage: string, error: string) {
    if (this.platform.is('android') && this.platform.is('capacitor')) {
      const errorMessage = {
        clientId: clientId,
        currentPage: currentPage,
        errorMessage: error,
        timestamp: Date.now()
      };
      // FirebaseCrashlytics.recordException({ message: JSON.stringify(errorMessage) });
    }
  }

  goBack() {
    console.log('window.history', window.history);
    this.location.back();
  }

  /* ------------- ngForm related ------------- START */
  markAllAsTouched(): void {
    Object.keys(this.ngForm.controls).forEach(key => this.ngForm.controls[key].markAsTouched());
  }

  markAndValidateForm(): boolean {
    this.markAllAsTouched();
    return this.ngForm.valid;
  }
// TODO: convert to a service
getErrors(className: string) {
  const errorsMessage = '';
  if (this.submitAttempted && this.ngForm.controls != null) {
    const errors = this.ngForm.controls[className].errors;
    return errors != null ? this.getErrorMessage(errors) : errorsMessage;
  }
  return errorsMessage;
}

// TODO: convert to a service
getErrorMessage(errorMap: any) {
  const errorMessages = Object.keys(errorMap).map(errorType => {
    switch (errorType) {
      case 'required': {
        return this.translate.instant('required');
      }
      case 'min': {
        const params = { 'min': errorMap.min.min };
        return this.translate.instant('validationMessage.min', params);
      }
      case 'max': {
        const params = { 'max': errorMap.max.max };
        return this.translate.instant('validationMessage.max', params);
      }
      case 'minlength': {
        const params = { 'minlength': errorMap.minlength.requiredLength };
        return this.translate.instant('validationMessage.minlength', params);
      }
      case 'maxlength': {
        const params = { 'maxlength': errorMap.maxlength.requiredLength };
        return this.translate.instant('validationMessage.maxlength', params);
      }
      case 'email': {
        return this.translate.instant('validationMessage.email');
      }
      case 'mustMatch': {
        const params = { 'field1': errorMap[errorType].controlName, 'field2': errorMap[errorType].matchingControlName };
        return this.translate.instant('validationMessage.mustMatch', params);
      }
      case 'passwordMustMatch': {
        return this.translate.instant('validationMessage.passwordMustMatch');
      }
      case 'identificationMustMatchDoB': {
        return this.translate.instant('validationMessage.identificationMustMatchDoB');
      }
    }
  });
  return errorMessages.join('. ');
  }
  /* ------------- ngForm related ------------- END */
}
