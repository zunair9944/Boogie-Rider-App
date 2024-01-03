import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BasePage } from 'src/app/base.page';

@Component({
  selector: 'app-card-information',
  templateUrl: './card-information.page.html',
  styleUrls: ['./card-information.page.scss'],
})
export class CardInformationPage extends BasePage {

  signUpError: string = ''
  splashBgBottom = 'assets/icon/bottombg2.svg';
  show: boolean = false;
  showRe: boolean = false;
  showLoadingSpin: boolean = false;
  showCnt = true;
  nextRoute = '/ride-preferences';
  cardArr:any = [];
  currentMY:any;
  constructor(private ref: ChangeDetectorRef,injector: Injector) {
    super(injector)
   }

  override ngOnInit() {
    this.initForm()
  }
  override ionViewWillEnter(){
    this.currentMY = `${new Date().getFullYear()}-0${new Date().getMonth()}`
    this.showCnt = true
    if (history.state.data) {
      this.nextRoute = history.state.data.backRoute;
    }
    console.log(this.cache.get('register'))
    let registerValues:any = {}
    if(this.cache.get('register') != null){
      registerValues = this.cache.get('register') || ''
      registerValues = this.cache.get('register') ? JSON.parse(registerValues) : null;
      console.log('registerValues....', registerValues)
      if(Object.keys(registerValues).length){
        let cardInfo = registerValues.cardInfo
        if(cardInfo && Object.keys(cardInfo).length){
          Object.keys(cardInfo).forEach(name => {
            if (this.ngForm.controls[name]) {
              this.ngForm.controls[name].patchValue(cardInfo[name]);
            }
          });
        }
      }
    }
  }
  initForm(){
    this.ngForm = this.formBuilder.group({
      card_number: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      expiration_date: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      cvc: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      card_holder_name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      billing_zip: new FormControl('', Validators.compose([
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
        const input = {
          billing_zip: this.ngForm.value.billing_zip,
          card_holder_name: this.ngForm.value.card_holder_name,
          cvc: this.ngForm.value.cvc,
          expiration_date: this.ngForm.value.expiration_date,
          card_number: this.ngForm.value.card_number
        };
        let registerStorage:any = {}
        if(this.cache.get('register') != null){
          registerStorage = this.cache.get('register') || ''
          registerStorage = JSON.parse(registerStorage);
        }
        
        console.log('input', input);

        registerStorage['cardInfo'] = input;
        this.cache.store('register', JSON.stringify(registerStorage));
        await this.updateCardArr(input);
        this.showCnt = false;
        this.ref.detectChanges();
        this.router.navigateByUrl(this.nextRoute);
        // this.loadingService.dismiss();
        this.showLoadingSpin = false;
        
      }
      catch (error) {
        console.error('login error', error);
      }
      finally {
        this.loadingService.dismiss(true);
        this.showLoadingSpin = false;
      }
    }
  }
  updateCardArr(input:any){
    this.cardArr = this.cache.get('cardsArr') || null
    this.cardArr = this.cache.get('cardsArr') ? JSON.parse(this.cardArr) : [];
    if(input){
      let found = this.cardArr.filter((item:any) => item.card_number == input.card_number);
      if(found.length == 0){
        this.cardArr.push(input);
        this.cache.store('cardsArr', JSON.stringify(this.cardArr));
      }
    }  
  }
  get f() {
    return this.ngForm.controls;
  }
  backRoute(){
    this.router.navigateByUrl('ride-preferences')
  }
  goToAddCard(){
    this.router.navigateByUrl('card-information')
  }

  // maskCardInput(ev:any){
  //   let val:any = `${this.ngForm.value.card_number}`;
  //   var regExp = /[a-zA-Z]/g;
                
  //   if(regExp.test(val)){
  //     console.log('contains')
  //     // this.ngForm.value.card_number = this.ngForm.value.card_number.slice(0, -1);
  //     let newVal = val.substring(0, val.length);
  //     this.ngForm.controls['card_number'].setValue(newVal);
  //     return
  //   }

  //   console.log('character length', val.length)
  //   // console.log('typeof val', typeof val)
  //   // if(typeof val != 'number'){
  //   //   console.log('value ===> ', val)
  //   //   console.log('without last character', this.ngForm.value.card_number.shift())
  //   //   this.ngForm.value.card_number = this.ngForm.value.card_number.shift();
  //   // }
  //   if(val.length == 19){
  //     let newVal = val.substring(0, val.length);
  //     this.ngForm.controls['card_number'].setValue(newVal);
  //   }
  //   if(val.length == 4 || val.length == 9 || val.length == 14){
  //     console.log('in condition')
  //     let newVal = `${val} `; 
  //     this.ngForm.controls['card_number'].setValue(newVal)
  //   }
  // }

  maskCardInput(event:any){
    const input = event.target.value//event.target as HTMLInputElement;
    let trimmed = input.replace(/\s+/g, '');

    var regExp = /[a-zA-Z]/g;
    if(regExp.test(trimmed)){
      console.log('contains')
      let newVal = trimmed.substring(0, trimmed.length-1);
      this.ngForm.controls['card_number'].setValue(newVal);
      return
    }

    if(trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }

    let numbers = [];
    for(let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }

    let newVal = numbers.join(' ');
    this.ngForm.controls['card_number'].setValue(newVal)
  }
}