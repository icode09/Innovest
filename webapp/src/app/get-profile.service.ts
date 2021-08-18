import { UserProfile } from './common/user-profile';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetProfileService {

  constructor(private _http : HttpClient) { }

  getUserDetails(emailId:string) : Observable<[UserProfile]>{
    return this._http.get<[UserProfile]>(`/api/v1/register/email/?emailId=${emailId}`);
  }

  getUserProfile(userName:string): Observable<UserProfile> {
    return this._http.get<UserProfile>("http://localhost:8082/api/v1/register/email/?emailId=" + userName);
  }
}
