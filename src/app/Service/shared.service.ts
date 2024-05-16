import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  message:string = "";
  constructor() { }

  setMessage(data:any){
    console.log("In-srvice: ",data);
    
    this.message=data;
  }
  getMessage(){
    console.log("Get: ",this.message);
    
    return this.message;
  }
}
