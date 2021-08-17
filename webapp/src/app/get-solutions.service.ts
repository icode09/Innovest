import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Solution } from './common/solution';

@Injectable({
  providedIn: 'root',
})
export class GetSolutionsService {
  constructor(private httpClient: HttpClient) {}

  getSolutionsBySolvedBy(solvedBy: String): Observable<[Solution]> {
    return this.httpClient
      .get<[Solution]>(`/solutions/?solvedBy=${solvedBy}`)
      .pipe(catchError(this.errorHandler));
  }

  getSolutionsByChallengeId(challengeId: String): Observable<[Solution]> {
    return this.httpClient
      .get<[Solution]>(
        `/solutions/?challengeId=${challengeId}`
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
}
