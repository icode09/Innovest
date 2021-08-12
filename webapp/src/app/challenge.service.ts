import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class challengeService {

  _url = 'http://localhost:8080/innovest/challenge/create';
  constructor(private _http: HttpClient) { }

  createChallenge(cd : any){
    console.log("challenge details in dervice:", cd);
    return this._http.post<any>(this._url, cd, {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    });
  }
}
