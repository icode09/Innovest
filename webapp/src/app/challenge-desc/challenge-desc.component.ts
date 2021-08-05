import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import { Challenge } from '../common/challenge';
////https://stackoverflow.com/questions/43159090/how-can-i-detect-service-variable-change-when-updated-from-another-component
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

@Component({
  selector: 'app-challenge-desc',
  templateUrl: './challenge-desc.component.html',
  styleUrls: ['./challenge-desc.component.css'],
})
export class ChallengeDescComponent implements OnInit {
  challenge: Challenge;
  users: UserProfile[] = [
    {
      userId: 1,
      userName: 'Parag More',
      password: 'String;',
      domain: ['aerospace', 'science', 'engineering', 'rocket science'],
      bio: 'String',
      avatar: 'String',
      avatarName: 'String',
    },
  ];
  asideVisible: boolean;

  constructor(
    private sidebarService: SharedDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.asideVisible = this.sidebarService.isSidebarVisible;
    this.challenge = JSON.parse(
      this.route.snapshot.paramMap.get('chalDesc') || '{}'
    );
    //https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
    // console.log(this.sidebarService.isSidebarVisible);
  }
  get isSidebarVisible(): boolean {
    console.log(this.sidebarService.isSidebarVisible);
    return this.sidebarService.isSidebarVisible;
  }
  @ViewChild('drawer') drawer!: MatSidenav;
  ngOnInit(): void {}

  register(challenge: Challenge) {
    this.router.navigate([
      '/solution-form',
      JSON.stringify({
        challengeId: challenge.challengeId,
        challengeName: challenge.challengeName,
        abstraction: challenge.abstraction,
        rules: challenge.rules,
      }),
    ]);
  }
}
