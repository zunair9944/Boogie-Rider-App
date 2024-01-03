import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CacheHelperService } from '../cache/cache-helper.service';
import { AuthService } from './../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {
  token: any;
  headers: any = {};
  constructor(
    private http: HttpClient,
    private cacheHelperService: CacheHelperService,
    private authService: AuthService
  ) {

  }
  defaultApiName = environment.api.baseUrl;
  path = {
    rider: {
      driverPreferences: { path: 'driverPreferences', apiName: this.defaultApiName },
      musics: { path: 'musics', apiName: this.defaultApiName },
      sendMessage: { path: 'sendMessage', apiName: this.defaultApiName },
      fetchMessages: { path: 'fetchMessages', apiName: this.defaultApiName },
      makeSeen: { path: 'makeSeen', apiName: this.defaultApiName },
      deleteConversation: { path: 'deleteConversation', apiName: this.defaultApiName },
      deleteMessage: { path: 'deleteMessage', apiName: this.defaultApiName },
      getContacts: { path: 'getContacts', apiName: this.defaultApiName },
      getRideHistory: { path: 'getHistory', apiName: this.defaultApiName },
      getVehicleTypeList: { path: 'service-list', apiName: this.defaultApiName },
      getUserCardList: { path: 'getRiderCards', apiName: this.defaultApiName },
      rideRequest: { path: 'save-riderequest', apiName: this.defaultApiName },
      cancleRideRequest: { path: 'riderequest-cancel', apiName: this.defaultApiName },
      findDriver: { path: 'findDriver', apiName: this.defaultApiName },
      saveRating: { path: 'save-ride-rating', apiName: this.defaultApiName },
      getActiveRide: { path: 'activeRide', apiName: this.defaultApiName },
      saveRideImage: { path: 'saveImage', apiName: this.defaultApiName },
      contactSupport: { path: 'support', apiName: this.defaultApiName },
      getNotifications: { path: 'notification-list', apiName: this.defaultApiName },
      updateImage: {path: 'profileImage', apiName: this.defaultApiName}
    },
    common : {
      getOTP : { path: 'getforgetPasswordOtp', apiName: this.defaultApiName},
      getProfile: { path: 'getUserDetail', apiName: this.defaultApiName},
      saveImage: { path: 'saveImage', apiName: this.defaultApiName },
    }
  }

  /**************************************  Rider APIS ********************************/

  async saveImage(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.common.saveImage.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async sendMessage(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.rider.sendMessage.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async fetchMessages(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.rider.fetchMessages.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }
  async makeSeen(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.rider.makeSeen.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }
  async getInboxContacts() {
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.rider.getContacts.path
    const response = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null
  }

  async deleteMessage(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    let url = this.defaultApiName + this.path.rider.deleteMessage.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async deleteConversation(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.rider.deleteConversation.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async getDriverPreferences() {
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.rider.driverPreferences.path
    const response = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null
  }

  async getMusics() {
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.rider.musics.path
    const response = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null
  }

  async getRideHistory(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.rider.getRideHistory.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async getVehicleTypeList() {
    const params = {}
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.rider.getVehicleTypeList.path
    const response = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null
  }

  async getUserCardList() {
    const params = {}
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.rider.getUserCardList.path
    const response = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null
  }

  async rideRequest(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.rider.rideRequest.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async cancleRideRequest(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.rider.cancleRideRequest.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async findDriver(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.rider.findDriver.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async saveRating(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.rider.saveRating.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async saveRideImage(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.rider.saveRideImage.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async getActiveRide(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.rider.getActiveRide.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async contactSupport(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.rider.contactSupport.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }
  
  async getNotifications(data:any = {}) {
    
    const params = data;
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.rider.getNotifications.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async updateImage(data:any = {}) {
    
    const params = data;
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    let url = this.defaultApiName + this.path.rider.updateImage.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }
  /**************************************  Rider APIS ********************************/










  /**************************************  Common APIS ********************************/
  async getOTP(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.common.getOTP.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async getProfile(){
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.common.getProfile.path
    const response = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null
  }

}
