import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  get(query:String) : Observable<Object[]> {
    return this.http.get<Object[]>("http://localhost:8105/api/challenge/search/" + query);
  }

  getAll() : Observable<Object[]> {
    return this.http.get<Object[]>("http://localhost:8105/api/challenge/getAll");
  }
}
