import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Challenge } from 'src/app/common/challenge';
import { UserProfile } from 'src/app/common/user-profile';
import { SearchService } from 'src/app/search.service';
import { ChallengeService } from 'src/app/challenge.service';
import { GetProfileService } from 'src/app/get-profile.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  userName:any;
  user:UserProfile | undefined;
  userDomains:string[] = ["Business & Entepreneurship","Chemistry","Computer/Info.technology","Engineering/Design","Environment","Food/Agriculture","Life Sciencess","Math/Statistics","Physical Sciences","Request for Partners and Suppliers","Social innovation"];
  challengeList: Challenge[] = [];
  recommendedChallenges: Challenge[] = [];
  recentyAddedChallenges: Challenge[] = [];
  topChallenges: Challenge[] = [];
  progressbar: boolean = true;
  queries = {query :''};
  searchPlaceHolder: String = 'Search';

  catagoriesList: String[] = ["Business & Entepreneurship","Chemistry","Computer/Info.technology","Engineering/Design","Environment","Food/Agriculture","Life Sciencess","Math/Statistics","Physical Sciences","Request for Partners and Suppliers","Social innovation"];
  constructor(private challengeService: ChallengeService,
    private searchService: SearchService,
    private getProfileService: GetProfileService,
    private router: Router,private http:HttpClient) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.progressbar = false;
    }, 500);
    this.userName = localStorage.getItem("currentUser");
    if(this.userName != null){
      this.getProfileService.getUserProfile(this.userName).subscribe((user) => {
        this.user = user;
        if(user.domain==null || user.domain.length==0){
          this.userDomains = user.domain;
        }
      });
    }
    this.challengeService.getChallengeList().subscribe((challenges) => {
      this.challengeList = challenges;
    });
    this.searchService.searchByDomainList(this.userDomains,this.userName).subscribe((challenges) => {
      this.recommendedChallenges = challenges;
    });
    this.searchService.findRecentyAddedChallenges(10,this.userName).subscribe((challenges) => {
      this.recentyAddedChallenges = challenges;
    });
    this.searchService.findTopChallenges(10,this.userName).subscribe((challenges) => {
      this.topChallenges = challenges;
    });
  }
  ngAfterViewChecked(){  
    let items1 = document.querySelectorAll('.recommended');
    // console.log("length",items.length);

    items1.forEach((el) => {
      const minPerSlide = 3;
      let next = el.nextElementSibling;
      for (var i=1; i<minPerSlide; i++) {
          if (!next) {
              // wrap carousel by using first child
            next = items1[0];
          }
          let cloneChild = next.cloneNode(true);
          el.appendChild(cloneChild.childNodes[0]);
          next = next.nextElementSibling;
      }
    });

    let items2 = document.querySelectorAll('.latest');
    // console.log("length",items2.length);

    items2.forEach((el) => {
      const minPerSlide = 3;
      let next = el.nextElementSibling;
      for (var i=1; i<minPerSlide; i++) {
          if (!next) {
              // wrap carousel by using first child
            next = items2[0];
          }
          let cloneChild = next.cloneNode(true);
          el.appendChild(cloneChild.childNodes[0]);
          next = next.nextElementSibling;
      }
    });

    let items3 = document.querySelectorAll('.top');
    // console.log("length",items3.length);

    items3.forEach((el) => {
      const minPerSlide = 3;
      let next = el.nextElementSibling;
      for (var i=1; i<minPerSlide; i++) {
          if (!next) {
              // wrap carousel by using first child
            next = items3[0];
          }
          let cloneChild = next.cloneNode(true);
          el.appendChild(cloneChild.childNodes[0]);
          next = next.nextElementSibling;
      }
    });
  }
  getChallengeList(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>("/innovest/challenge/getall");
  }
  getUserDetails(): Observable<UserProfile> {
    return this.http.get<UserProfile>("/api/v1/register/email/?emailId=" + this.userName);
  }
  viewChallengeDesc(challenge:Challenge){
    // console.log(challenge.challengeName);
    // this.router.navigate(['/challenge-desc', JSON.stringify(challenge)]);
    // this.challengeService.updateViews(challenge).subscribe();
    localStorage.setItem('chClicked', 'yes');
    challenge.challengeImage = "https://assets.weforum.org/article/image/large_bg1B3jyBjInTSH2AjIgjgoER9PYwCN-BZ_BQhdeZ92s.jpg";
    return "http://localhost:4200/#/challenge-desc/"+encodeURIComponent(JSON.stringify(challenge));
  }
  viewAllChallenges(word:string){
    this.router.navigate(['dashboard/ch-list/find']).then(() => {
      window.location.reload();
    });
  }
  search(word:any){
    if(word == 'text'){
      if(this.queries.query == ""){
        this.ngOnInit();
      }else{
        localStorage.setItem('searchQuery', this.queries.query);
        this.router.navigate(['dashboard/ch-list/find']);
      }
    }
    else if(word == 'voice'){
      localStorage.setItem('searchVoice', 'voice');
      this.router.navigate(['dashboard/ch-list/find']);
    }
  }
}
