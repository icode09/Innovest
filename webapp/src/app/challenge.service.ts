import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Challenge } from './common/challenge';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  _url = 'http://localhost:8080/innovest/challenge/upload';
  constructor(private _http: HttpClient) { }

  createChallenge(cd : any){
    console.log("challenge details in dervice:", cd);
    return this._http.post<any>(this._url, cd, {
      headers : new HttpHeaders({
        'Content-Type' : 'multipart/form-data'

      })
    });
  }

  getChallengeList(): Observable<Challenge[]> {
    return this._http.get<Challenge[]>(this._url + "getall");
  }

  updateViews(challenge:Challenge) : Observable<any> {
    return this._http.put<any>(this._url + "updateviews/" + challenge.challengeId, challenge);
  }
  
}
