import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solution } from './common/solution';

@Injectable({
  providedIn: 'root',
})
export class SubmitSolutionService {
  constructor(private httpClient: HttpClient) {}

  addSolution(solution: Solution): Observable<Solution> {
    return this.httpClient.post<Solution>(
      'http://localhost:8090/solutions/add',
      solution
    );
  }
}
