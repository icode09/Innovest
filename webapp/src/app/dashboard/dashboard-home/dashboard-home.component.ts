import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Challenge } from 'src/app/common/challenge';
import { UserProfile } from 'src/app/common/user-profile';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  userName:any;
  catagoriesList: string[] = []; 
  challengeList: Challenge[] = []; 
  constructor(private router: Router,private http:HttpClient) { }

  ngOnInit(): void {
    // this.userName = localStorage.getItem("currentUser");
    this.userName = "dilip1234@gmail.com"
    this.getChallengeList().subscribe((challenges) => {
      this.challengeList = challenges;
    });
    this.getUserDetails().subscribe((user) => {
      let user1:UserProfile = user;
      console.log(user1);
      this.catagoriesList = user1.domain;
    });
  }
  ngAfterViewChecked(){  
    let items = document.querySelectorAll('.carousel .carousel-item');
    console.log("length",items.length);

    items.forEach((el) => {
      const minPerSlide = 3;
      let next = el.nextElementSibling;
      for (var i=1; i<minPerSlide; i++) {
          if (!next) {
              // wrap carousel by using first child
            next = items[0];
          }
          let cloneChild = next.cloneNode(true);
          el.appendChild(cloneChild.childNodes[0]);
          next = next.nextElementSibling;
      }
    });

    items = document.querySelectorAll('.hello');
    console.log("length",items.length);

    items.forEach((el) => {
      const minPerSlide = 3;
      let next = el.nextElementSibling;
      for (var i=1; i<minPerSlide; i++) {
          if (!next) {
              // wrap carousel by using first child
            next = items[0];
          }
          let cloneChild = next.cloneNode(true);
          el.appendChild(cloneChild.childNodes[0]);
          next = next.nextElementSibling;
      }
    });
  }
  getChallengeList(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>("http://localhost:8080/innovest/challenge/getall");
  }
  getUserDetails(): Observable<UserProfile> {
    return this.http.get<UserProfile>("http://localhost:8082/api/v1/register/email/?emailId=dilip1234@gmail.com");
  }
  viewChallengeDesc(challenge:Challenge){
    // console.log(challenge.challengeName);
    // this.router.navigate(['/challenge-desc', JSON.stringify(challenge)]);
    challenge.challengeImage = "https://assets.weforum.org/article/image/large_bg1B3jyBjInTSH2AjIgjgoER9PYwCN-BZ_BQhdeZ92s.jpg";
    return "http://localhost:4200/challenge-desc/"+encodeURIComponent(JSON.stringify(challenge));
  }
  viewAllChallenges(word:string){
    this.router.navigate(['dashboard/ch-list/find']).then(() => {
      window.location.reload();
    });
  }

}
