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
    return this.http.post('http://localhost:8100/login',data)
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
storeToken(token:any){
  sessionStorage.setItem("mytoken",token);
}
opendashboard(){
  this.myroute.navigate(['dashboard']);

}
}
