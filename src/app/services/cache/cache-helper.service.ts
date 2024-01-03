import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheHelperService {

  constructor() { }

  store(key: any, info: any){
    localStorage.setItem(key, info);
  }

  get(key:any){
    return localStorage.getItem(key);
  }

  delete(key:any){
    return localStorage.removeItem(key);
  }

  clear(){
    localStorage.clear()
  }

}
