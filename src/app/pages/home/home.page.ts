import { Component, ElementRef, ViewChild, OnInit, Injector, Output } from '@angular/core';
import { BasePage } from 'src/app/base.page';
import { HomeModalPage } from 'src/app/modals/home-modal/home-modal.page';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import { drawMarker } from 'src/app/helper/google-helper';
import { PusherService } from 'src/app/services/pusher/pusher.service';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { result } from 'lodash';
interface Location {
  lat: number
  lng: number
}
const riderIcon =
{
  url: "https://developers.google.com/static/maps/documentation/javascript/images/default-marker.png",
  // size: new google.maps.Size(48, 48),
  // origin: new google.maps.Point(0, 0),
  // anchor: new google.maps.Point(0, 48),
};
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends BasePage {
  // @Output getchild;
  rides: any = [];
  auth_id: any;
  ride_id: any;
  directionsService = new google.maps.DirectionsService;
  directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: false, preserveViewport: false,
    polylineOptions: {
      strokeColor: "#A352A3"
    }
  });
  // directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: false, preserveViewport: false });
  gmap: any = null;
  riderMarker: any = null;
  riderCircle: any = null;
  myLoc: Location = { lat: 0, lng: 0 }
  showSearchingForRider = false;
  loadingcity: boolean = false;
  city:any = '';
  circleTimer: any = null;
  homeModal: any;
  bellIcon:any = '/assets/icon/bell-nodot.svg';
  constructor(private httpClient: HttpClient,private pusherService: PusherService, injector: Injector) {
    super(injector)
    let userIfo = this.cache.get('user_info') || ''
    if (userIfo) {
      let data = JSON.parse(userIfo);
      this.auth_id = data.id;
    }
  }

  async ngOnInit() {
    // await this.getRideHistory();
  }
  @ViewChild('#modal') modal: ElementRef;
  moveTo(breakpoint: number) {
    const { nativeElement } = this.modal;
    if (!nativeElement) {
      return;
    }
    nativeElement.setCurrentBreakpoint(breakpoint);
  }
  getchild() {
    return { display_name: 'qaiser' }
  }
  async getRideHistory() {
    try {
      this.loadingService.present();
      const payload = { user_id: this.auth_id, type: 'rider' }
      const response: any = await this.apiHelperService.getRideHistory(payload);
      console.log('response', response);
      if (response.status == true) {
        this.rides = response.data;
        this.loadingService.dismiss();
      }
      if (response.status == false) {
        this.alertService.presentErrorAlert('Sorry, Invalid username/password')
      }

    }
    catch (error: any) {
      this.alertService.presentErrorAlert(error.error.message);
    }
    finally {
      this.loadingService.dismiss(true);
    }
  }

  goTo() {
    this.router.navigateByUrl('/product-result')
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async ionViewWillEnter() {
    this.loadingcity = true;
  }
  async getCity(){
    let latlng;
    latlng = new google.maps.LatLng(this.myLoc.lat, this.myLoc.lng); // New York, US
    //latlng = new google.maps.LatLng(37.990849233935194, 23.738339349999933); // Athens, GR
    //latlng = new google.maps.LatLng(48.8567, 2.3508); // Paris, FR
    //latlng = new google.maps.LatLng(47.98247572667902, -102.49018710000001); // New Town, US
    //latlng = new google.maps.LatLng(35.44448406385493, 50.99001635390618); // Parand, Tehran, IR
    //latlng = new google.maps.LatLng(34.66431108560504, 50.89113940078118); // Saveh, Markazi, IR
    let geocoder: any = {'latLng' : latlng};
    new google.maps.Geocoder().geocode(geocoder, (results, status) => {      
        if (status == google.maps.GeocoderStatus.OK) {
          if (results && results[1]) {
              var country = null, countryCode = null, city = null, cityAlt = null;
              var c, lc, component;
              for (var r = 0, rl = results.length; r < rl; r += 1) {
                  var result = results[r];

                  if (!city && result.types[0] === 'locality') {
                      for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                          component = result.address_components[c];

                          if (component.types[0] === 'locality') {
                              city = component.long_name;
                              break;
                          }
                      }
                  }
                  else if (!city && !cityAlt && result.types[0] === 'administrative_area_level_1') {
                      for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                          component = result.address_components[c];

                          if (component.types[0] === 'administrative_area_level_1') {
                              cityAlt = component.long_name;
                              break;
                          }
                      }
                  } else if (!country && result.types[0] === 'country') {
                      country = result.address_components[0].long_name;
                      countryCode = result.address_components[0].short_name;
                  }

                  if (city && country) {
                      break;
                  }
              }
              this.loadingcity = false;
              this.city = city;
              this.cache.store('city', city);
              console.log("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
          }
        }
    });
  }

  async ionViewDidEnter() {
    await this.presentModal();
    await this.loadMap();
    await this.getCity();
  }

  ionViewWillLeave(): void {
    if (this.modalCtrl) {
      this.modalCtrl.dismiss();
    }
  }
  async presentModal() {
    this.homeModal = await this.modalCtrl.create({
      component: HomeModalPage,
      showBackdrop: false,
      initialBreakpoint: 0.75,
      backdropBreakpoint: 0.75,
      breakpoints: [0.75, 0.3],
      handleBehavior: 'cycle',
      backdropDismiss: false,
      cssClass: 'modalMain handlesmall',
      id: 'homemodal',
      componentProps: {
        updateRoute: this.updateRoute.bind(this),
        handleRideRequest: this.handleRideRequest.bind(this),
        hideSearchingDriverInfo: this.hideSearchingDriverInfo.bind(this),
        presentHomeModal: this.showHomeModal.bind(this),
        removRoute: this.removRoute.bind(this),
        takeScreenshot: this.takeScreenshot.bind(this),
        notify: this.notify.bind(this),
        getAddress: this.getAddress.bind(this),
        gmap: this.gmap,
        myLoc: this.myLoc
      }
    });
    return await this.homeModal.present();
  }
  
  async notify(){
    this.bellIcon = '/assets/icon/bell-icon.svg';
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
  async showHomeModal() {
    if (this.modalCtrl) {
      this.modalCtrl.dismiss();
    }
    this.presentModal();
  }
  updateRoute(start: Location, end: Location, fitBounds: boolean = false) {
    this.drawRoute(start, end, fitBounds)
  }
  getAddress() {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.myLoc.lat},${this.myLoc.lng}&key=${environment.google.website_key}`).then(result => result.json()).then(result => {
    if (result && result?. results?.length) {
      return {address:result.results[0].formatted_address, lat: result.results[0].geometry.location.lat, lng:result.results[0].geometry.location.lng} 
      }
  
      return null
    })
  }            
  async loadMap() {
    console.log('in loadmap func............');
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('coord.........', coordinates)
    this.myLoc.lat = coordinates.coords.latitude;
    this.myLoc.lng = coordinates.coords.longitude;

    console.log('myLoc............', this.myLoc)

    this.gmap = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 15,
        center: new google.maps.LatLng(this.myLoc),
        disableDefaultUI: true,
        mapId: environment.google.mapStyleId
      }
    );

    // MAKE RIDER MARKER
    // this.riderMarker = new google.maps.Marker({
    //   position: this.myLoc,
    //   map: this.gmap,
    //   icon: riderIcon
    // });

  }

  drawRoute(start: any, end: any, fitBounds: boolean = false) {
    this.directionsRenderer.setMap(this.gmap);
    const origin = new google.maps.LatLng(start);
    const destination = new google.maps.LatLng(end);
    this.directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        this.directionsRenderer.setDirections(response);
        if (fitBounds) {
          this.gmap.fitBounds(start, end);
        }
      })
      .catch((e) => console.log(e));
  }

  drawLocationPing(location: Location) {
    const radius = 150;
    const circleOption = {
      strokeColor: "#A352A3",
      strokeOpacity: 0.8,
      strokeWeight: 1.5,
      fillColor: "#A352A3",
      fillOpacity: 0.35,
      map: this.gmap,
      center: new google.maps.LatLng(location),
      radius: radius,
    };
    this.riderCircle = new google.maps.Circle(circleOption);

    var rMin = 10;
    var rMax = radius;
    var direction = 1;
    var that = this;
    this.circleTimer = setInterval(function () {
      var radius = that.riderCircle.getRadius();

      if ((radius > rMax) || (radius < rMin)) {
        direction *= -1;
      }
      circleOption.radius = radius + direction * 10;
      circleOption.fillOpacity = 0.2;

      that.riderCircle.setOptions(circleOption);
    }, 70);
  }



  handleRideRequest(location: Location) {
    this.drawLocationPing(location);
    this.riderMarker = drawMarker(location, this.gmap, 'rider');
    this.moveMapToLocation(location);
    this.showSearchingForRider = true;
  }

  moveMapToLocation(location: Location) {
    this.gmap.panTo(location)
  }

  hideSearchingDriverInfo() {
    this.showSearchingForRider = false;
    if (this.riderMarker != null) {
      this.riderMarker.setMap(null);
    }
    clearInterval(this.circleTimer);
    if (this.riderCircle != null) {
      this.riderCircle.setMap(null);
    }
  }

  removRoute() {
    // this.driverMarker(dd.locations.driver2, this.gmap, 'driver')
    // this.makeDriverMapMarker();
    // this.drawLocationPing();
    this.gmap.panTo(this.myLoc)
    // drawMarker(this.myLoc, this.gmap, 'driver');
    this.directionsRenderer.setMap(null);
  }

  takeScreenshot() {
    let rideInfof: any = this.cache.get('rideInfo');
    if (rideInfof) {
      rideInfof = JSON.parse(rideInfof);
      if (!rideInfof.rideImageSaved) {
        let elem: any = document.querySelector("#map > div > div > div:nth-child(2) > div:nth-child(1)");
        let transform: any = elem.style.transform
        var comp = transform.split(",") //split up the transform matrix
        console.log('comp', comp);

        var mapleft = parseFloat(comp[4]) //get left value
        var maptop = parseFloat(comp[5])  //get top value

        elem.style.transform = "none"
        elem.style.left = mapleft
        elem.style.top = maptop


        let ele: any = document.querySelector("#map")
        html2canvas(ele, { useCORS: true, scale: 2, height: 700, width: 358 }).then(async (canvas) => {
          // console.log('canvas=====>', canvas.toDataURL())
          try {
            const payload = { id: rideInfof.ride_id, type: 'ride', image: canvas.toDataURL() };
            const resp: any = await this.apiHelperService.saveRideImage(payload);
            if (resp && resp.status) {
              rideInfof.rideImageSaved = true;
              this.cache.store('rideInfof', JSON.stringify(rideInfof));
            }
          } catch (ex) {

          }

        });
      }
    }
  }
}
