import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Challenge } from './common/challenge';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url = '/api/challenge/';

  constructor(private http: HttpClient) { }

  searchByChallengeName(query:String) : Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.url + "search/" + query);
  }

  searchByDomain(query:String) : Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.url + "findByDomain/" + query);
  }

  searchByDomainList(domain:String[],userName:String) : Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.url+ "findByDomainList/?domainList=" +encodeURIComponent(domain.join(", ")) 
                                              + "&userName=" +userName);
  }

  findTopChallenges(query:number) : Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.url + "findTop/" + query);
  }

  findRecentyAddedChallenges(query:number,userName:String) : Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.url + "findLatest/?limit=" + query + "&userName=" +userName);
  }

  getAll() : Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.url + "getAll");
  }
}
