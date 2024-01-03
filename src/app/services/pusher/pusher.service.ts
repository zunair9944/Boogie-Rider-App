import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
//'../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CacheHelperService } from '../cache/cache-helper.service';
// declare const Pusher: any;
import Pusher from 'pusher-js';
@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  messagesChannel: any;
  notificationChannel:any;
  constructor(private cashe: CacheHelperService, private http: HttpClient) {
    this.pusher = new Pusher(
      environment.pusher.key, 
      {
        cluster: environment.pusher.cluster,
        // encrypted: true,
        authEndpoint: environment.api.baseUrl+'pusher/auth',
        auth: {
          headers: {
              'Authorization': `Bearer ${this.cashe.get('token')}`
          }
        }
      }
    );
    // Pusher.logToConsole = true;

    // this.pusher = new Pusher(environment.pusher.key, {
    //   cluster: environment.pusher.cluster
    // });
    this.notificationChannel = this.pusher.subscribe('notifications');
    this.messagesChannel = this.pusher.subscribe('private-messages');
    

  }
}
