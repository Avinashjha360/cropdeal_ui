import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private count =0;
  private alert ={
      status: false,
      message: "Invalid credentials. Please double-check your credentials and try again."
  }

  constructor() { }

  setAlert(status:boolean, message:string){
    this.alert.status = status,
    this.alert.message = message
  }
  getAlert(){
    return this.alert;
  }

  getCounter(){
    return this.count;
  }
  setCount(count:number){
    this.count=count;
  }
}
