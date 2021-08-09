import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge } from '../common/challenge';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

export interface UserProfile {
  userId: number;
  userName: String;
  password: String;
  domain: string[];
  bio: String;
  avatar: String;
  avatarName: String;
}
@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css'],
})
export class ChallengeListComponent implements OnInit {
  
  user: UserProfile = {
    userId:1,
    userName: 'Rohit Kumar',
    password: 'String;',
    domain: ["Business & Entepreneurship","Chemistry","Computer/Info.technology","Engineering/Design","Environment","Food/Agriculture","Life Sciencess","Math/Statistics","Physical Sciences","Request for Partners and Suppliers","Social innovation"],
    bio: 'String',
    avatar: 'String',
    avatarName: 'String',
  };
  selectedChips: string[] = ['All'];
  chipsControl = new FormControl('All');
  chipsValue$ = this.chipsControl.valueChanges;

  queries = {query :''};
  searchArr: object[] = [];
  challengeList: Challenge[] = [];
  subscribedDomainChallengeList: Challenge[] = [];

  constructor(private router: Router, private searchService: SearchService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getChallengeListFromServer();

    console.log("ngOnInit: ", this.selectedChips);
    this.subscribedDomainChallengeList = this.challengeList.filter( cha =>
      // cha.domain.some( d => this.selectedChips.includes(d) )
      cha.domain.some( d => this.user.domain.includes(d) )
    );
    // this.consoleButton();
    
    this.chipsValue$.subscribe((selected) => {
      console.log("Inside chipsValue$.subscribe: ", this.selectedChips);
      this.selectedChips = selected.map((x: string) => x.trim());
      var a = document.getElementById("allMatChip");
      this.consoleButton();
    });

  }

  getChallengeListFromServer() {
    // this.getChallengeList().subscribe((challenges) => {
    //   this.challengeList = challenges;
    // });
    this.challengeList = [
      {
        challengeId: '1',
        challengerName: '',
        challengeName: 'eSahayak Blogging Competition Week-3',
        description: 'string',
        rules: 'string',
        abstraction:
          "'All that you need to know about eSahayak Blogging Competition Week-3 eSahayak is back with the Blogging Competition. In this week we will select the top 5 published articles from eSahayak Blog and award them a certificate of excellence. Moreover, the top 2 blogs of the week will get a reward of INR 1,000 each.One person can submit as many articles as they want to. However, only one article submitted by an individual in a week will be considered for the prize money. But, submitting more articles will increase your chances of winning.We hope that this competition will provide you with an opportunity to publish your pieces, and to give you early experience with a competitive edge in the marketplace!'",
        domain: ["Business & Entepreneurship","Chemistry"],
        startDate: new Date(),
        endDate: new Date(),
        registrationType: 'string',
        participationType: 'string',
        paid: true,
        rewardPrize: 50000,
        challengeImage:
          'https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/60f95db3b3711_copy_of_linkedin_post__3_.png?d=1920x1920',
        domains: [],
        imageName: 'string',
        documentUrl: 'string',
        registrations: 5645,
        views: 6504,
      },
      {
        challengeId: '2',
        challengerName: '',
        challengeName: 'Water Problem in village',
        description: 'Village aaaa facing water shortage... read more',
        rules: 'rule1....rule2',
        abstraction:
          "'All that you need to know about eSahayak Blogging Competition Week-3 eSahayak is back with the Blogging Competition. In this week we will select the top 5 published articles from eSahayak Blog and award them a certificate of excellence. Moreover, the top 2 blogs of the week will get a reward of INR 1,000 each.One person can submit as many articles as they want to. However, only one article submitted by an individual in a week will be considered for the prize money. But, submitting more articles will increase your chances of winning.We hope that this competition will provide you with an opportunity to publish your pieces, and to give you early experience with a competitive edge in the marketplace!'",
        domain: ["Chemistry","Computer/Info.technology","Engineering/Design"],
        startDate: new Date(),
        endDate: new Date(),
        registrationType: 'string',
        participationType: 'string',
        paid: true,
        rewardPrize: 24000,
        challengeImage:
          'https://images.theconversation.com/files/340018/original/file-20200605-176546-1vkao9j.jpg?ixlib=rb-1.1.0&rect=7%2C30%2C5081%2C3357&q=45&auto=format&w=496&fit=clip',
        imageName: 'string',
        domains: [],
        documentUrl: 'string',
        registrations: 565,
        views: 504,
      },
      {
        challengeId: '3',
        challengerName: '',
        challengeName: 'Waste and Land pollution',
        description: 'Need urgent solution needed in ...... city near ........',
        rules: 'rule1....rule2',
        abstraction:
          "'All that you need to know about eSahayak Blogging Competition Week-3 eSahayak is back with the Blogging Competition. In this week we will select the top 5 published articles from eSahayak Blog and award them a certificate of excellence. Moreover, the top 2 blogs of the week will get a reward of INR 1,000 each.One person can submit as many articles as they want to. However, only one article submitted by an individual in a week will be considered for the prize money. But, submitting more articles will increase your chances of winning.We hope that this competition will provide you with an opportunity to publish your pieces, and to give you early experience with a competitive edge in the marketplace!'",
        domain: ["Physical Sciences","Request for Partners and Suppliers","Social innovation","Physical Sciences","Request for Partners and Suppliers","Social innovation"],
        startDate: new Date(),
        endDate: new Date("2021-08-16"),
        registrationType: 'string',
        participationType: 'string',
        paid: true,
        rewardPrize: 18000,
        challengeImage:
          'https://images.theconversation.com/files/340018/original/file-20200605-176546-1vkao9j.jpg?ixlib=rb-1.1.0&rect=7%2C30%2C5081%2C3357&q=45&auto=format&w=496&fit=clip',
        imageName: 'string',
        domains: [],
        documentUrl: 'string',
        registrations: 25,
        views: 147,
      }
    ];
  }
  getChallengeList(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>("http://localhost:8080/innovest/challenge/getall");
  }

  viewChallenge(challenge: Challenge) {
    this.router.navigate(['/challenge-desc', JSON.stringify(challenge)]);
  }
  
  search(): void {
    if(this.queries.query == "") {
      this.searchService.getAll().subscribe( arr => {
        this.searchArr = arr;
      });
      console.log(this.searchArr);
    }
    else {
      this.searchService.get(this.queries.query).subscribe( arr => {
        this.searchArr = arr;
      });
      console.log(this.searchArr);
    }
  }
  consoleButton() {
    // console.log("chipsControl:", this.chipsControl);
    // console.log("challengeList:", this.challengeList);
    // console.log("subscribedDomainChallengeList:", this.subscribedDomainChallengeList);
    // console.log("user.domain:", this.user.domain);
    // console.log("selectedChips:", this.selectedChips);
    // console.log("ch[1].domain:", this.challengeList[1].domain);
    // console.log("selectedChips[0]:", this.selectedChips[0]);
    // console.log("challengeList[1].domain[2]:", this.challengeList[1].domain[2]);
    // console.log(this.selectedChips[0] === this.challengeList[1].domain[2]);
    // console.log(this.challengeList[0].domain.some( d => this.selectedChips.includes(d)));
    // console.log(this.challengeList[1].domain.some( d => this.selectedChips.includes(d)));
    // console.log(this.challengeList[2].domain.some( d => this.selectedChips.includes(d)));
    
    this.subscribedDomainChallengeList = this.challengeList.filter( cha =>
      // cha.domain === this.user.domain
      // cha.domain.filter( d => this.user.domain.includes(d));
      cha.domain.some( d => this.selectedChips.includes("All") ? this.user.domain.includes(d) : this.selectedChips.includes(d) )
    );
  }
  onSelectionChange(chip: any,c: any){
    if(chip.selected){
      c.deselect();
    }
  }

}
