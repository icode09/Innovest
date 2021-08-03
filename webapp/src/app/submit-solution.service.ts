import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solution } from './common/solution';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SubmitSolutionService {
  constructor(private httpClient: HttpClient) {}

  addSolution(solution: Solution): Observable<Solution> {
    return this.httpClient
      .post<Solution>('http://localhost:8090/solutions/add', solution)
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
