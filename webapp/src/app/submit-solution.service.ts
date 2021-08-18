import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solution } from './common/solution';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root',
})
export class SubmitSolutionService {
  constructor(private httpClient: HttpClient) {}

  addSolution(solution: any): Observable<any> {
    // var fileUrl = ``;
    // console.log(file);
    // if (file) {
    //   fileUrl = `?file=${file}`;
    // }
    return this.httpClient
      .post<Solution>(`/solutions/add`, solution)
      .pipe(catchError(this.errorHandler));
  }

  updateSolutionStatus(
    solution: string,
    solutionStatus: String
  ): Observable<Solution> {
    console.log(solution);
    return this.httpClient
      .put<Solution>(
        `/solutions/update/solutionStatus?solutionId=${solution}&solutionStatus=${solutionStatus}`,
        { solutionId: solution, solutionStatus: 'Accepted' }
      )
      .pipe(catchError(this.errorHandler));
  }

  // updateReviewComments(solutionId: string,reviewComments: any): Observable<Solution> {
  //   console.log('solutionId:', solutionId);
  //   console.log('review comments:', reviewComments);
  //   return this.httpClient
  //     .put<Solution>(`/solutions/update/reviewComments/${solutionId}`,reviewComments)
  //     .pipe(catchError(this.errorHandler));
  // }

  updateReviewComments(solId: any, comment: any) {
    console.log("solutionId:", solId);
    console.log("comment:", comment);
    return this.httpClient.put(`/solutions/update/reviewComments/${solId}`, comment)
    .pipe(catchError(this.errorHandler));
  }
  updateSolution(solution: any): Observable<Solution> {
    return this.httpClient
      .put<Solution>(`/solutions/updateSolution`, solution)
      .pipe(catchError(this.errorHandler));
  }

  updateFile(solution: any): Observable<any> {
    return this.httpClient
      .put<Solution>(`/solutions/updateFile`, solution)
      .pipe(catchError(this.errorHandler));
  }

  getSolutionById(solutionId: any): Observable<Solution> {
    return this.httpClient.get<Solution>(`/solutions/getSolution/${solutionId}`)
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
