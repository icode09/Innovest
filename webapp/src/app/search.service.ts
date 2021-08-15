import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Challenge } from './common/challenge';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url = 'http://localhost:8105/api/challenge/';

  constructor(private http: HttpClient) { }

  searchByChallengeName(query:String) : Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.url + "search/" + query);
  }

  searchByDomain(query:String) : Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.url + "findByDomain/" + query);
  }

  searchByDomainList(query:String[]) : Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.url + "findByDomainList/?domainList=" + query.join(", "));
  }

  findTopChallenges(query:number) : Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.url + "findTop/" + query);
  }

  getAll() : Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.url + "getAll");
  }
}
