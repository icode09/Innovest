import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Challenge } from './challenge';

@Injectable({
  providedIn: 'root'
})
export class CreatingchallengeService {

  _url = '';
  constructor(private _http: HttpClient) { }

  createChallenge(cd : Challenge){
    return this._http.post<any>(this._url, cd);
  }
}
