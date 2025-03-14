import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes the service available application-wide
})
export class UserService {

  readonly PATH_OF_API = "http://localhost:8087/api/"
  constructor(private http:HttpClient) { }

  getAllUser(){
    return this.http.get(this.PATH_OF_API+"users");
  }

  updateUser(user:any, userId:string){
    return this.http.put(this.PATH_OF_API+"user/update/"+userId,user);
  }

  getUserById(userId:string){
    return this.http.get(this.PATH_OF_API+"user/"+userId);
  }

  deleteUser(userId:string){
    return this.http.delete(this.PATH_OF_API+"user/delete/"+userId);
  }

  getUserTasks(userEmail:string){
    return this.http.get(this.PATH_OF_API+"task/"+userEmail);
  }
}

