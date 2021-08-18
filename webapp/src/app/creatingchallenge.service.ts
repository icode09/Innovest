import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Challenge } from './common/challenge';

@Injectable({
  providedIn: 'root'
})
export class CreatingchallengeService {

  _url = '/innovest/challenge/create';
  constructor(private _http: HttpClient) { }

  createChallenge(cd: any) {
    console.log("challenge details in dervice:", cd);
    return this._http.post<any>(this._url, cd, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  getChallengeByChallengeId(challengeId: String): Observable<Challenge> {
    return this._http
      .get<Challenge>(
        `/innovest/challenge/challenge/${challengeId}`
      )
      .pipe(catchError(this.errorHandler));
  }
  public errorHandler(error: Response | any) {
    if (error instanceof ErrorEvent) {
      // client-side error
      return throwError('Something bad happened');
    } else {
      // server-side error
      return throwError(error);
    }
  }

// use challenge.servie.ts..

}
