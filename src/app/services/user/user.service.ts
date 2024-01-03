import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UsersService {
  private localName = localStorage.getItem('userName') || 'Rider Name';
  private localImg = localStorage.getItem('userImg') || '/assets/icon/user-2.png';
  private user = new BehaviorSubject<string>(this.localName);
  private profileImg = new BehaviorSubject<string>(this.localImg)
  castUser = this.user.asObservable();
  castImg = this.profileImg.asObservable();

  constructor() { }

  editUserName(newUser:any){
    this.user.next(newUser);
  }

  editUserImg(newImg:any){
    this.profileImg.next(newImg);
  }

}