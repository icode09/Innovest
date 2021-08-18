import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from './common/app.constants';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isLogin = false;
  constructor(private http: HttpClient, private myroute: Router) {}
  login(data: any): Observable<any> {
    return this.http.post(AppConstants.login_API, data);
  }

  register(user: any): Observable<any> {
    return this.http.post(
      '/api/v1/register/registered',
      user
    );
  }
  updateUser(user :any) : Observable<any>{
    return this.http.post('/api/v1/register/update',user);
  }
  storeToken(token: any, username: any) {
    localStorage.setItem('mytoken', token);
    localStorage.setItem('currentUser', username);
    //sessionStorage.setItem("mytoken",token);
  }
  isLoggedIn() {
    if (localStorage.getItem('mytoken')) this.isLogin = true;
    else this.isLogin = false;
    return this.isLogin;
  }
  opendashboard() {
    this.myroute.navigate(['dashboard']).then(() => {
      window.location.reload();
    });
  }
}
