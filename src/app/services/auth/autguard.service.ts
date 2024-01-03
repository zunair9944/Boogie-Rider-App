import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutguardService {

  constructor() { }

  gettoken(){  
    return !!localStorage.getItem("token");  
  }  
}
