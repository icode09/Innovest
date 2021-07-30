import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from './common/app.constants';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  constructor(private http:HttpClient, private myroute: Router) { }
  login(data:any):Observable<any>{ 
    return this.http.post(AppConstants.login_API,data)
}

register(user:any): Observable<any> {
  return this.http.post(AppConstants.AUTH_API + 'signup', {
    displayName: user.displayName,
    email: user.email,
    password: user.password,
    matchingPassword: user.matchingPassword,
    socialProvider: 'LOCAL'
  }, httpOptions);
}
storeToken(token:any,username:any){
  localStorage.setItem("mytoken",token);
  localStorage.setItem("currently logged in user",username);
  //sessionStorage.setItem("mytoken",token);
}
opendashboard(){
  this.myroute.navigate(['dashboard']);

}
}
