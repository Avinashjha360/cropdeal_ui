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

  getCounter(){
    return this.count;
  }
  setCount(count:number){
    this.count=count;
  }
}
