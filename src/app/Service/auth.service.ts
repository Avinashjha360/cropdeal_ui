import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http:HttpClient) { 

  }

  getToken(username:String, password:String){
    this.http.post("http://localhost:8087/api/login",{
      "username": username,
      "password": password
    }).subscribe(res=>{
      console.log(res);
    });
  }

}
