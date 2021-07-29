import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
export interface Challenge {
  challengeId: number;
  challengerId: number;
  challengeName: string;
  description: string;
  rules: string;
  abstraction: string;
  startDate: number;
  endDate: number;
  paid: boolean;
  rewardPrize: number;
  challengeImage: string;
  imageName: string;
  documentUrl: string;
  domains: String[];
  registrations: number;
  views: number;
}
@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css'],
})
export class ChallengeListComponent implements OnInit {
  challengeList: Challenge[] = [];
  // for (let index = 0; index < 3; index++) {
  //   challengeList[index]
    
  // }
  // challenge: Challenge = {
  //   challengeId: 1,
  //   challengerId: 1,
  //   challengeName: 'eSahayak Blogging Competition Week-3',
  //   description: 'string',
  //   rules: 'string',
  //   abstraction:
  //     "'All that you need to know about eSahayak Blogging Competition Week-3 eSahayak is back with the Blogging Competition. In this week we will select the top 5 published articles from eSahayak Blog and award them a certificate of excellence. Moreover, the top 2 blogs of the week will get a reward of INR 1,000 each.One person can submit as many articles as they want to. However, only one article submitted by an individual in a week will be considered for the prize money. But, submitting more articles will increase your chances of winning.We hope that this competition will provide you with an opportunity to publish your pieces, and to give you early experience with a competitive edge in the marketplace!'",
  //   startDate: Date.now(),
  //   endDate: Date.now() + 3,
  //   paid: true,
  //   rewardPrize: 50000,
  //   challengeImage:
  //     'https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/60f95db3b3711_copy_of_linkedin_post__3_.png?d=1920x1920',
  //   imageName: 'string',
  //   documentUrl: 'string',
  //   domains: ['aerospace', 'science', 'engineering', 'rocket science'],
  //   registrations: 5645,
  //   views: 6504,
  // };
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
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getChallengeListFromServer();
  }

  getChallengeListFromServer() {
    // for (let index = 0; index < 3; index++) {
      this.challengeList[0] = {
        challengeId: 1,
        challengerId: 1,
        challengeName: 'eSahayak Blogging Competition Week-3',
        description: 'string',
        rules: 'string',
        abstraction:
          "'All that you need to know about eSahayak Blogging Competition Week-3 eSahayak is back with the Blogging Competition. In this week we will select the top 5 published articles from eSahayak Blog and award them a certificate of excellence. Moreover, the top 2 blogs of the week will get a reward of INR 1,000 each.One person can submit as many articles as they want to. However, only one article submitted by an individual in a week will be considered for the prize money. But, submitting more articles will increase your chances of winning.We hope that this competition will provide you with an opportunity to publish your pieces, and to give you early experience with a competitive edge in the marketplace!'",
        startDate: Date.now(),
        endDate: Date.now() + 3,
        paid: true,
        rewardPrize: 50000,
        challengeImage:
          'https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/60f95db3b3711_copy_of_linkedin_post__3_.png?d=1920x1920',
        imageName: 'string',
        documentUrl: 'string',
        domains: ['aerospace', 'science', 'engineering', 'rocket science'],
        registrations: 5645,
        views: 6504,
      };
      this.challengeList[1] = {
        challengeId: 1,
        challengerId: 1,
        challengeName: 'Water Problem in village',
        description: 'Village aaaa facing water shortage... read more',
        rules: 'string',
        abstraction:
          "'All that you need to know about eSahayak Blogging Competition Week-3 eSahayak is back with the Blogging Competition. In this week we will select the top 5 published articles from eSahayak Blog and award them a certificate of excellence. Moreover, the top 2 blogs of the week will get a reward of INR 1,000 each.One person can submit as many articles as they want to. However, only one article submitted by an individual in a week will be considered for the prize money. But, submitting more articles will increase your chances of winning.We hope that this competition will provide you with an opportunity to publish your pieces, and to give you early experience with a competitive edge in the marketplace!'",
        startDate: Date.now(),
        endDate: Date.now() + 3,
        paid: true,
        rewardPrize: 24000,
        challengeImage:
          'https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/60f95db3b3711_copy_of_linkedin_post__3_.png?d=1920x1920',
        imageName: 'string',
        documentUrl: 'string',
        domains: ['environmental', 'science', 'engineering', 'Rural development'],
        registrations: 565,
        views: 504,
      };
  }

  viewChallenge(challenge: Challenge) {
    this.router.navigate(['/challenge-desc', JSON.stringify(challenge)]);
  }
}
