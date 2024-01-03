import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CacheHelperService } from '../cache/cache-helper.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cacheHelperService: CacheHelperService,
    private router: Router
  ) { }
  defaultApiName = environment.api.baseUrl;
  token:any;
  user = {
    login : { path: 'login', apiName: this.defaultApiName},
    register : { path: 'register', apiName: this.defaultApiName},
    logout : { path: 'logout', apiName: this.defaultApiName},
    changePassword : { path: 'forgetPasswordOtp', apiName: this.defaultApiName},
    riderUpdate : { path: 'riderUpdate', apiName: this.defaultApiName}
  }
  async authenticate(username:any, password:any){
    const params =  {
      type: 'rider',
      username,
      password
    }

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(params);
    console.log(body)
    let url = this.defaultApiName+this.user.login.path;
    const response = await this.http.post(url, body,{'headers':headers}).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async register(params:any){
    const headers = { 'content-type': 'application/json'} 

    const body=params;
    console.log(body)
    let url = this.defaultApiName+this.user.register.path
    console.log('type of cards', typeof body['cards'])
    const response = await this.http.post(url, body,{'headers':headers}).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async riderUpdate(params:any){
    const body=params;
    console.log(body)
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName+this.user.riderUpdate.path
    console.log('type of cards', typeof body['cards'])
    const response = await this.http.post(url, body,{'headers':headers}).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async logout(attempt:any = null){
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}`}  
    let url = this.defaultApiName + this.user.logout.path
    const response:any = await this.http.get(url,{'headers':headers}).toPromise();
    if (response && response.status == true) {
      this.cacheHelperService.clear();
      return response;
    }
    return null
  }

  async changePassword(params:any){

    const headers = { 'content-type': 'application/json'}  
    const body= JSON.stringify(params);
    console.log(body)
    let url = this.defaultApiName+this.user.changePassword.path
    const response = await this.http.post(url, body,{'headers':headers}).toPromise();
    if (response) {
        return response;
    }
    return null;
  }
}
