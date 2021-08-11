import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Challenge } from './common/challenge';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  get(query:String) : Observable<Challenge[]> {
    return this.http.get<Challenge[]>("http://localhost:8105/api/challenge/search/" + query);
  }

  getAll() : Observable<Challenge[]> {
    return this.http.get<Challenge[]>("http://localhost:8105/api/challenge/getAll");
  }
}
