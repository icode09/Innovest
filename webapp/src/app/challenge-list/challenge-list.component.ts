import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge } from '../challenge';
import { SearchService } from '../search.service';

import { Observable } from 'rxjs';


export interface Domain {
  name: string;
}
export interface UserProfile {
  userId: number;
  userName: String;
  password: String;
  domain: String[];
  bio: String;
  avatar: String;
  avatarName: String;
}
// export interface Challenge {
//   challengeId: number;
//   challengerId: number;
//   challengeName: string;
//   description: string;
//   rules: string;
//   abstraction: string;
//   startDate: Date;
//   endDate: Date;
//   paid: boolean;
//   rewardPrize: number;
//   challengeImage: string;
//   imageName: string;
//   documentUrl: string;
//   domains: String[];
//   registrations: number;
//   views: number;
// }
@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css'],
})
export class ChallengeListComponent implements OnInit {
  queries = {query :''};
  searchArr: object[] = [];
  challengeList: Challenge[] = [];
  users: UserProfile[] = [
    {
      userId: 1,
      userName: 'Rohit Kumar',
      password: 'String;',
      domain: ['aerospace', 'science', 'engineering', 'rocket science'],
      bio: 'String',
      avatar: 'String',
      avatarName: 'String',
    },
  ];

  constructor(private router: Router, private searchService: SearchService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getChallengeListFromServer();
  }

  getChallengeListFromServer() {
    this.getChallengeList().subscribe((challenges) => {
      this.challengeList = challenges;
    })
    // this.challengeList = [
    //   ...this.challengeList,
    //   {
    //     challengeId: 1,
    //     challengerId: 1,
    //     challengeName: 'eSahayak Blogging Competition Week-3',
    //     description: 'string',
    //     rules: 'string',
    //     abstraction:
    //       "'All that you need to know about eSahayak Blogging Competition Week-3 eSahayak is back with the Blogging Competition. In this week we will select the top 5 published articles from eSahayak Blog and award them a certificate of excellence. Moreover, the top 2 blogs of the week will get a reward of INR 1,000 each.One person can submit as many articles as they want to. However, only one article submitted by an individual in a week will be considered for the prize money. But, submitting more articles will increase your chances of winning.We hope that this competition will provide you with an opportunity to publish your pieces, and to give you early experience with a competitive edge in the marketplace!'",
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     paid: true,
    //     rewardPrize: 50000,
    //     challengeImage:
    //       'https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/60f95db3b3711_copy_of_linkedin_post__3_.png?d=1920x1920',
    //     imageName: 'string',
    //     documentUrl: 'string',
    //     domains: ['aerospace', 'science', 'engineering', 'rocket science'],
    //     registrations: 5645,
    //     views: 6504,
    //   },
    //   {
    //     challengeId: 2,
    //     challengerId: 1,
    //     challengeName: 'Water Problem in village',
    //     description: 'Village aaaa facing water shortage... read more',
    //     rules: 'rule1....rule2',
    //     abstraction:
    //       "'All that you need to know about eSahayak Blogging Competition Week-3 eSahayak is back with the Blogging Competition. In this week we will select the top 5 published articles from eSahayak Blog and award them a certificate of excellence. Moreover, the top 2 blogs of the week will get a reward of INR 1,000 each.One person can submit as many articles as they want to. However, only one article submitted by an individual in a week will be considered for the prize money. But, submitting more articles will increase your chances of winning.We hope that this competition will provide you with an opportunity to publish your pieces, and to give you early experience with a competitive edge in the marketplace!'",
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     paid: true,
    //     rewardPrize: 24000,
    //     challengeImage:
    //       'https://images.theconversation.com/files/340018/original/file-20200605-176546-1vkao9j.jpg?ixlib=rb-1.1.0&rect=7%2C30%2C5081%2C3357&q=45&auto=format&w=496&fit=clip',
    //     imageName: 'string',
    //     documentUrl: 'string',
    //     domains: [
    //       'environmental',
    //       'science',
    //       'engineering',
    //       'Rural development',
    //     ],
    //     registrations: 565,
    //     views: 504,
    //   },
    // ];
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


}
