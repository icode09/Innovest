import { Component, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import { Challenge } from '../common/challenge';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChallengeService } from '../challenge.service';

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
  form: any = {}
  isSuccessful = false;
  errorMessage = '';
  listener;
  @Input() scrolled:boolean = false;
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
    private route: ActivatedRoute,
    private http:HttpClient,
    private renderer2: Renderer2,
    private challengeService: ChallengeService
  ) {
    this.asideVisible = this.sidebarService.isSidebarVisible;
    this.challenge = JSON.parse(
      this.route.snapshot.paramMap.get('chalDesc') || '{}'
    );
    //https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
    // console.log(this.sidebarService.isSidebarVisible);
    this.listener = this.renderer2.listen('window', 'scroll', (e) => {
      if(this.getYPosition(e)>455){
        this.scrolled = true;
        
      }else{
        this.scrolled= false;
      }
    });
  }
  get isSidebarVisible(): boolean {
    console.log(this.sidebarService.isSidebarVisible);
    return this.sidebarService.isSidebarVisible;
  }
  @ViewChild('drawer') drawer!: MatSidenav;

  @HostListener('document:scroll')

  ngOnInit(): void {
    /* for updating challenge views */
    let message = localStorage.getItem('chClicked');
    localStorage.removeItem('chClicked');
    if(message != null && message == 'yes' && this.challenge != null) {
      console.log(this.challenge.challengeId);
      this.challengeService.updateViews(this.challenge.challengeId).subscribe();
    }
    /* for updating challenge views - ends */
  }

  sendFeedback():void{
    if(this.form.invalid){
      return;
    }
    let url = "/api/v1/feedback/feedback";
    this.http.post(url, this.form).subscribe(
      (data) => {
        console.log("data:",data);
        this.isSuccessful = true;
        this.router.navigate(['/login'])
        // this.router.navigate(['login'], {queryParams: { registered: 'true' } });
      },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occurred.");
      }
    }
    );
  
  }
 

  getYPosition(e: any): number {
    return e.target.scrollingElement.scrollTop;
  }
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
