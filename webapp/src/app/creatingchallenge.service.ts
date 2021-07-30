import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Challenge } from './challenge';

@Injectable({
  providedIn: 'root'
})
export class CreatingchallengeService {

  _url = 'http://localhost:8080/innovest/challenge/create';
  constructor(private _http: HttpClient) { }

  createChallenge(cd : Challenge){
    return this._http.post<any>(this._url, cd);
  }
}
