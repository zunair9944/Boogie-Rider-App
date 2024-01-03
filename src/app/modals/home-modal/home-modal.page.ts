import { ChangeDetectorRef, Component, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base.page';
import { PusherService } from 'src/app/services/pusher/pusher.service';
import { SelectVehicleModalPage } from '../select-vehicle-modal/select-vehicle-modal.page';
import { RidewPage } from '../ridew/ridew.page';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { OnWayModalPage } from '../on-way-modal/on-way-modal.page';

interface Location {
  lat: number
  lng: number
}
// var g = google;
@Component({
  selector: 'app-home-modal',
  templateUrl: './home-modal.page.html',
  styleUrls: ['./home-modal.page.scss'],
})
export class HomeModalPage extends BasePage {
  @ViewChild('pickupEle', { read: IonSearchbar }) pickupEle: IonSearchbar;
  @ViewChild('dropOffEle', { read: IonSearchbar }) dropOffEle: IonSearchbar;
  // @ViewChild('pacInput', { read: ElementRef }) input: ElementRef;
  vList: boolean = false;
  history: boolean = true;
  showVSpin: boolean = false;
  fidRideSpin: boolean = false;
  showAdLoader: boolean = false;
  vehicleTypeList: any = [];
  userCardList: any = [];
  selectedVehicle: any;
  selectedCard:any;
  cardId: any;
  pickup: any;
  dropoff: any;
  auth_id: any;
  timer: any = 1;
  timerInterval: any;
  findDriverInterval: any;
  findDriverIntervalMins: number = 0;
  myLoc: any;

  @Input() gmap: any;
  @Input() takeScreenshot: any;
  @Input() updateRoute: any;
  @Input() handleRideRequest: any;
  @Input() hideSearchingDriverInfo: any;
  @Input() presentHomeModal: any;
  @Input() removRoute: any;
  @Input() pickUpAutocomplete: any;
  @Input() dropOffAutocomplete: any;
  @Input() notify:any;
  @Input() getAddress:any;
  isRideRequestExpired: boolean = false;

  constructor(private ref: ChangeDetectorRef, private pusherService: PusherService, injector: Injector, public modalController: ModalController) {
    super(injector)
    let userIfo = this.cache.get('user_info') || ''
    if (userIfo) {
      let data = JSON.parse(userIfo);
      this.auth_id = data.id;
    }
  }


  ngOnInit(): void {
    this.listenRideCompleted();
    this.listenDriverArrived();
  }

  async autoCompleteListner() {



    // this.pickUpAutocomplete = new google.maps.places.Autocomplete(await this.pickupEle.getInputElement());

    // this.pickUpAutocomplete.addListener('place_changed', () => {
    //   // do whatever here
    //   const place = this.pickUpAutocomplete.getPlace();
    //   console.log('=>place pickup', place)
    //   this.pickup = { lat: place.geometry?.location?.lat(), lng: place.geometry?.location?.lng() };
    // });

    // this.dropOffAutocomplete = new google.maps.places.Autocomplete(await this.dropOffEle.getInputElement());

    // this.dropOffAutocomplete.addListener('place_changed', () => {
    //   // do whatever here
    //   // this.showVSpin = false;

    //   const place = this.dropOffAutocomplete.getPlace();
    //   this.dropoff = { lat: place.geometry?.location?.lat(), lng: place.geometry?.location?.lng() }
    //   this.history = false;
    //   this.vList = true;
    //   this.ref.detectChanges()
    // });



    // PICKUP
    var ionicPickupInput: any = document.getElementById("pickUp");
    let inputPickup = ionicPickupInput?.firstChild as HTMLInputElement;
    // inputPickup.remove();
    if (!inputPickup) {
      var x = document.createElement("INPUT");
      x.setAttribute("type", "text");
      let ele = '<input class="native-input sc-ion-input-ios pac-target-input" aria-labelledby="ion-input-2-lbl" autocapitalize="off" autocomplete="off" autocorrect="off" name="text" placeholder="Enter Pickup Point" spellcheck="false" type="text">';
      ionicPickupInput.innerHTML(ele);
      inputPickup = ionicPickupInput?.firstChild as HTMLInputElement;
    }

    var pickUpAutoComplete = new google.maps.places.Autocomplete(inputPickup);
    // pickUpAutoComplete.addListener("place_changed", () => {
    google.maps.event.addListener(pickUpAutoComplete, 'place_changed', () => {
      const place = pickUpAutoComplete.getPlace();
      // console.log('=>place pickup', place)
      this.pickup = { lat: place.geometry?.location?.lat(), lng: place.geometry?.location?.lng() };
      // console.log(place.geometry?.location?.lat());
      // console.log(place.geometry?.location?.lng());

    });

    // DROPOFF
    let ionicDropOffInput: any = document.getElementById("dropOff");
    let dropOffInput = ionicDropOffInput?.firstChild as HTMLInputElement;
    // dropOffInput.remove();
    if (!dropOffInput) {
      let ele = '<input class="native-input sc-ion-input-ios pac-target-input" autocapitalize="off" autocomplete="off" autocorrect="off" name="text" placeholder="Enter Drop off" spellcheck="false" type="text">';
      ionicDropOffInput.innerHTML(ele);
      dropOffInput = ionicDropOffInput?.firstChild as HTMLInputElement;
    }
    var dropOffAutoComplete = new google.maps.places.Autocomplete(dropOffInput);
    // dropOffAutoComplete.addListener("place_changed", () => {
    google.maps.event.addListener(dropOffAutoComplete, 'place_changed', () => {
      const place = dropOffAutoComplete.getPlace();
      this.dropoff = { lat: place.geometry?.location?.lat(), lng: place.geometry?.location?.lng() }
      this.history = false;

      // this.updateRoute(this.pickup, this.dropoff);


      // this.showVSpin = false;
      this.vList = true;
      this.ref.detectChanges()

    });
  }
  async getNow(){
    this.showAdLoader = true;
    let resp = await this.getAddress();
    var ionicPickupInput: any = document.getElementById("pickUp");
    let inputPickup = ionicPickupInput?.firstChild as HTMLInputElement;
    inputPickup.value = resp.address
    this.pickup = {lat: resp.lat, lng: resp.lng}
    this.showAdLoader = false;
    console.log(resp)
  }
  listenRideCompleted() {
    this.pusherService.notificationChannel.bind('complete-ride-request', async (payload: any) => {
      if (payload && payload.data && payload.data.rider_id == this.auth_id) {
        this.modalCtrl.dismiss();
        // if(!document.getElementById("homemodal")){
        // }
        await this.presentHomeModal();
        this.cache.delete('rideInfo');
        await this.removRoute();
        await this.hideSearchingDriverInfo();
        await this.notify();
      }
    });
  }

  listenDriverArrived() {
    this.pusherService.notificationChannel.bind('driver-arrived', (payload: any) => {
      if (payload && payload.data && payload.data.rider_id == this.auth_id) {
        this.modalCtrl.dismiss();
        this.onTheWayModal(payload.data);
        this.notify();
      }
    });
  }

  async ionViewWillEnter() {

    this.autoCompleteListner();
    await this.findActiveRide();
    // this.showVSpin = true;
    this.ref.detectChanges();
    await this.getVehicleList();
    await this.getUserCardList();

    this.selectedCard = this.userCardList.filter((item:any) => item.default == 1)
    this.selectedCard = this.selectedCard.length ? this.selectedCard[0].id : {};
    this.cardId = this.selectedCard
  }

  ionViewWillLeave(): void {
    // var ionicPickupInput = document.getElementById("pickUp");
    // let inputPickup = ionicPickupInput?.firstChild as HTMLInputElement;
    // inputPickup.remove();


    // inputPickup.value = '';
    // inputPickup.removeEventListener('place_changed', ()=> {
    //   console.log('event removed for input picker')
    // })


    // let ionicDropOffInput = document.getElementById("dropOff");
    // let dropOffInput = ionicDropOffInput?.firstChild as HTMLInputElement;
    // dropOffInput.remove();



    //  dropOffInput.removeEventListener('place_changed', ()=> {
    //   console.log('event removed for input dropoff')
    // })
    // dropOffInput.value = '';
    // this.selectedVehicle = '';
    // this.cardId = '';   
  }
  async findActiveRide() {
    try {
      this.loadingService.present();
      const payload = { user_id: this.auth_id, type: 'rider' }
      const response: any = await this.apiHelperService.getActiveRide(payload);
      this.loadingService.dismiss();
      console.log('response', response);
      if (response.status == true) {
        if (this.modalCtrl) {
          this.modalCtrl.dismiss();
        }
        // if ride status is driver awaiting.
        const rideData = response.data || null
        // driver location allah ho chowk
        // this.myLoc.lat = 31.469358;
        // this.myLoc.lng = 74.299110;
        if (rideData && rideData.ride_status === 'accepted') {
          this.showRideAcceptedModal(rideData);
        }
        if (rideData && rideData.ride_status === 'arrived') {
          let rideInfo: any = this.cache.get('rideInfo');
          let rideImageSaved = rideData.ride_image ? true : false;
          rideInfo = JSON.stringify({ ride_id: rideData.requestId, rideImageSaved: rideImageSaved })
          this.cache.delete('rideInfo');
          this.cache.store('rideInfo', rideInfo);
          this.onTheWayModal(rideData);
        }

      }
      if (response.status == false) {

      }

    }
    catch (error: any) {
      this.loadingService.dismiss();
      this.alertService.presentErrorAlert(error.error.message);
    }
    finally {
      this.loadingService.dismiss(true);
    }
  }

  async onTheWayModal(data: any) {
    // this.gmap.zoom = 20;
    const dropoffLocation: Location = { lat: 0, lng: 0 }
    dropoffLocation.lat = parseFloat(data.start_latitude) // in actual driver location
    dropoffLocation.lng = parseFloat(data.start_longitude) // in actual driver location
    const pickupLocation: Location = { lat: 0, lng: 0 }
    pickupLocation.lat = parseFloat(data.end_latitude);
    pickupLocation.lng = parseFloat(data.end_longitude);
    this.updateRoute(dropoffLocation, pickupLocation, true)
    if (this.modalCtrl) {
      this.modalCtrl.dismiss();
    }
    const modalRiderCancleRequest = await this.modalController.create({
      component: OnWayModalPage,
      showBackdrop: false,
      initialBreakpoint: 0.25,
      backdropBreakpoint: 0.82,
      breakpoints: [0.25, 0.2],
      handleBehavior: 'cycle',
      backdropDismiss: false,
      cssClass: 'modalMain',
      id: 'riderCancleRequestModal',
      componentProps: { data: data, takeScreenshot: this.takeScreenshot.bind(this), removRoute: this.removRoute.bind(this), presentHomeModal: this.presentHomeModal.bind(this), notify: this.notify.bind(this) }
    });
    modalRiderCancleRequest.onDidDismiss().then((resp) => {
    });
    return await modalRiderCancleRequest.present();
  }
  async getVehicleList() {

    try {
      // this.loadingService.present();

      const response: any = await this.apiHelperService.getVehicleTypeList();
      console.log('response', response);
      if (response.status == true) {
        this.vehicleTypeList = response.data;
      }
      if (response.status == false) {
        this.alertService.presentErrorAlert('Sorry, Invalid username/password')
      }

    }
    catch (error: any) {
      this.alertService.presentErrorAlert(error.error.message);
    }
    finally {
      // this.loadingService.dismiss(true);
    }
  }

  async getUserCardList() {

    try {
      const response: any = await this.apiHelperService.getUserCardList();
      console.log('response', response);
      if (response.status == true) {
        this.userCardList = response.data;
      }
      if (response.status == false) {
        this.alertService.presentErrorAlert('Sorry, Invalid username/password')
      }

    }
    catch (error: any) {
      this.alertService.presentErrorAlert(error.error.message);
    }
    finally {
      // this.loadingService.dismiss(true);
    }
  }

  selectVehicle(item: any, vehicle: any) {
    document.querySelector('.selected')?.classList.remove('selected');
    item.currentTarget.classList.add('selected');
    this.selectedVehicle = vehicle.id;
  }

  goTo() {
    // this.router.navigateByUrl('/product-result')
    // this.modalCtrl.dismiss(null, 'cancel');
  }

  requestRide = async () => {
    this.findDriver(this.auth_id);

    // if (!(this.pickup && this.dropoff)) {
    //   this.alertService.presentErrorAlert('Sorry, unable to detect you pickup And/Or drop off location, Can you please select again');
    //   return
    // }
    if (!this.selectedVehicle) {
      this.alertService.presentErrorAlert('Sorry, you have to select a vehicle first to book a Boogie Ride.');
      return
    }
    if (!this.cardId || this.cardId === '') {
      this.alertService.presentErrorAlert('Sorry, you have to select a card information to go ahead.');
      return
    }
    const data =
    {
      "start_latitude": this.pickup.lat,
      "start_longitude": this.pickup.lng,
      "end_latitude": this.dropoff.lat,
      "end_longitude": this.dropoff.lng,
      "service_id": this.selectedVehicle,
      "status": 'new_ride_requested',
      "card_id": this.cardId,
      "base_fare": 16.00,
      "is_schedule": 1
    }

    try {
      this.fidRideSpin = true;
      // this.loadingService.present();
      this.submitAttempted = true;
      console.log(data);
      const response: any = await this.apiHelperService.rideRequest(data);
      // this.loadingService.dismiss();
      console.log('==>', response);
      this.fidRideSpin = false;
      if (response.status == true) {
        if (this.modalCtrl) {
          this.modalCtrl.dismiss();
        }
        let rideId = response && response.data ? response.data.id : null;
        let rideInfo = { ride_id: rideId, rideImageSaved: false };
        this.cache.store('rideInfo', JSON.stringify(rideInfo));
        console.log(response.data);
        this.startTimer();
        const originLocation: Location = { lat: 0, lng: 0 }
        originLocation.lat = parseFloat(response.data.start_latitude)
        originLocation.lng = parseFloat(response.data.start_longitude)
        this.handleRideRequest(originLocation);


        this.findDriverInterval = setInterval(() => {
          console.log('interval 2')
          this.findDriverIntervalMins = this.findDriverIntervalMins + 1;
          let timeCompleted = this.findDriverIntervalMins == 3 ? 1 : 0;
          this.findDriver(rideId, timeCompleted);
        }, 5000)

      }
      if (response.status == false) {
        this.fidRideSpin = false;
        this.alertService.presentErrorAlert('oops something went wrong')
      }

    }
    catch (error: any) {
      this.submitAttempted = false;
      this.fidRideSpin = false;
      this.alertService.presentErrorAlert(error.message);
    }
    finally {
      // this.presentHomeModal();
      // this.isRideRequestExpired = true;
      this.submitAttempted = false;
      this.fidRideSpin = false;
      // this.loadingService.dismiss(true);
    }

  }

  startTimer = async () => {
    this.timerInterval = setInterval(() => {
      console.log('interval 1')

      if (this.findDriverIntervalMins >= 3 && this.isRideRequestExpired == false) {
        this.submitAttempted = false;
        this.isRideRequestExpired = true;
      } this.timer += 1;
    }, 1000);
  }

  findDriver = async (rideId: any, timeCompleted: any = 0) => {
    this.notify();
    if (this.isRideRequestExpired == false) {
      try {
        const data = { ride_request_id: rideId, request_time_completed: timeCompleted }
        const response: any = await this.apiHelperService.findDriver(data);
        console.log('<<==>>', response);
        if (response.status == true) {
          // this.loadingService.dismiss();
          this.isRideRequestExpired = true;
          clearInterval(this.timerInterval);
          clearInterval(this.findDriverInterval)
          // drow route b/w starting point and driver
          this.showRideAcceptedModal(response.data);

          // const origin: Location = { lat: 0, lng: 0 }
          // origin.lat = parseFloat(response.data.driverData.latitude)
          // origin.lng = parseFloat(response.data.driverData.logitude)

          // const destination: Location = { lat: this.myLoc.lat, lng: this.myLoc.lng }
          // this.updateRoute(origin, destination);
          this.hideSearchingDriverInfo()
          // alert("Driver found! drwa route here")
        }
        if (response.status == false) {
          console.log('this.findDriverIntervalMins.....', this.findDriverIntervalMins)
          if (response.status_code == 1) {
            if (this.findDriverIntervalMins <= 3) {
              // this.findDriver(rideId, timeCompleted);
            } else {
              console.log('111111111');

              clearInterval(this.timerInterval)
              clearInterval(this.findDriverInterval)
              this.presentHomeModal();
              this.isRideRequestExpired = true;
              this.alertService.presentAlert('Driver Not Found', 'Sorry! No driver found in your location. Please try again.', ['OK'])
            }
          }

          if (response.status_code == 2) {
            console.log('22222222222');
            clearInterval(this.timerInterval)
            clearInterval(this.findDriverInterval)
            this.isRideRequestExpired = true;
            this.hideSearchingDriverInfo()
            await this.presentHomeModal();
            this.alertService.presentAlert('Driver Not Found', 'Sorry! No driver found in your location. Please try again.', ['OK'])
          }

        }

      }
      catch (error: any) {
        this.fidRideSpin = false;
        this.alertService.presentErrorAlert(error.message);
      }
      finally {
        // this.loadingService.dismiss(true);
        this.fidRideSpin = false;
      }
    }

  }

  changeCard(event: any) {
    this.cardId = event.target.value;
  }

  async showRideAcceptedModal(data: any) {
    const driverLocation: Location = { lat: 0, lng: 0 }
    driverLocation.lat = parseFloat(data.driverData.latitude)
    driverLocation.lng = parseFloat(data.driverData.logitude)
    const pickupLocation: Location = { lat: 0, lng: 0 }
    pickupLocation.lat = parseFloat(data.start_latitude);
    pickupLocation.lng = parseFloat(data.start_longitude);
    this.updateRoute(driverLocation, pickupLocation, true);

    const modal = await this.modalController.create({
      component: RidewPage,
      canDismiss: true,
      showBackdrop: false,
      initialBreakpoint: 0.85,
      backdropBreakpoint: 0.85,
      breakpoints: [0.85, 0.25],
      handleBehavior: 'cycle',
      backdropDismiss: false,
      cssClass: 'modalMain handlesmall',
      id: 'rideRequestModal',
      handle: false,
      componentProps: { data, removRoute: this.removRoute.bind(this), presentHomeModal: this.presentHomeModal.bind(this), notify: this.notify.bind(this) }
    });
    modal.onDidDismiss().then((resp) => {
      // if(resp.data && resp.data.showHomeModal){
      //   this.presentHomeModal();
      // }
    });
    return await modal.present();
  }
  async updateLocationMoveMapToMarker() {

  }
}
