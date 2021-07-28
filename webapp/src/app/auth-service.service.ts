import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  login(data:any):Observable<any>{ 
    return this.http.post('http://localhost:8100/login',data)
}
storeToken(token:any){
  sessionStorage.setItem("mytoken",token);
}

}
