import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge } from '../common/challenge';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { __await } from 'tslib';
import { ChallengeService } from '../challenge.service';


declare const annyang: any;

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

  queries = {query :'', error:''};
  searchArr: object[] = [];
  searchPlaceHolder: String = 'Search';
  challengeList: Challenge[] = [];             // all challenges in challenge service
  subscribedDomainChallengeList: Challenge[] = [];  // user subcribed domain only challenges in challenge service

  url:string = '';
  searchDomainChips:string[]=[];
  
  constructor(private router: Router, private challengeService: ChallengeService, private searchService: SearchService, private http: HttpClient, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.url = this.router.url.split('/').pop() || '';
    console.log("Inside ngOnInit");

    this.getChallengeListFromServer();    // getting all the challenges from challenge service

    let searchText = localStorage.getItem('searchQuery');
    localStorage.removeItem('searchQuery');
    if(searchText != null){
      this.queries.query = searchText;
      this.searchClick();
    }
    console.log("search:",searchText);

    let searchVoice = localStorage.getItem('searchVoice');
    localStorage.removeItem('searchVoice');
    if(searchVoice != null && searchVoice == 'voice'){
      this.startVoiceRecognition();
    }
    console.log("search:",searchVoice);

    this.chipsValue$.subscribe((selected) => {
      this.selectedChips = selected.map((x: string) => x.trim());
      console.log("Inside chipsValue$.subscribe: ", this.selectedChips);
      if(this.selectedChips.length == 0){
        this.selectedChips.push("All");
      }
      console.log("~Inside chipsValue$.subscribe: ", this.url);
      this.update_subscribedDomainChallengeList();
    });

  }

  getChallengeListFromServer() {
    this.challengeService.getChallengeList().subscribe((challenges) => {
      this.challengeList = challenges;
      if(this.url == 'find') {
        this.subscribedDomainChallengeList = challenges.filter( cha =>
          cha.domain.some( d => this.selectedChips.includes("All") ? this.user.domain.includes(d) : this.selectedChips.includes(d) )
          && cha.challengerName != localStorage.getItem("currentUser")
        );
      }
      else {
        this.subscribedDomainChallengeList = challenges.filter( cha =>
          cha.challengerName == localStorage.getItem("currentUser") && 
          cha.domain.some( d => this.selectedChips.includes("All") ? this.user.domain.includes(d) : this.selectedChips.includes(d) )
        );
      }
    });
    
    console.log("1.challengeList:",this.challengeList);
    console.log("1.subscribedDomainChallengeList:",this.subscribedDomainChallengeList);
    // this.challengeList = [
    //   {
    //     challengeId: '1',
    //     challengerName: '',
    //     challengeName: 'eSahayak Blogging Competition Week-3',
    //     description: 'string',
    //     rules: 'string',
    //     abstraction:
    //       "'All that you need to know about eSahayak Blogging Competition Week-3 eSahayak is back with the Blogging Competition. In this week we will select the top 5 published articles from eSahayak Blog and award them a certificate of excellence. Moreover, the top 2 blogs of the week will get a reward of INR 1,000 each.One person can submit as many articles as they want to. However, only one article submitted by an individual in a week will be considered for the prize money. But, submitting more articles will increase your chances of winning.We hope that this competition will provide you with an opportunity to publish your pieces, and to give you early experience with a competitive edge in the marketplace!'",
    //     domain: ["Business & Entepreneurship","Chemistry"],
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     registrationType: 'string',
    //     participationType: 'string',
    //     paid: true,
    //     rewardPrize: 50000,
    //     challengeImage:
    //       'https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/60f95db3b3711_copy_of_linkedin_post__3_.png?d=1920x1920',
    //     domains: [],
    //     imageName: 'string',
    //     documentUrl: 'string',
    //     registrations: 5645,
    //     views: 6504,
    //   },
    //   {
    //     challengeId: '2',
    //     challengerName: '',
    //     challengeName: 'Water Problem in village',
    //     description: 'Village aaaa facing water shortage... read more',
    //     rules: 'rule1....rule2',
    //     abstraction:
    //       "'All that you need to know about eSahayak Blogging Competition Week-3 eSahayak is back with the Blogging Competition. In this week we will select the top 5 published articles from eSahayak Blog and award them a certificate of excellence. Moreover, the top 2 blogs of the week will get a reward of INR 1,000 each.One person can submit as many articles as they want to. However, only one article submitted by an individual in a week will be considered for the prize money. But, submitting more articles will increase your chances of winning.We hope that this competition will provide you with an opportunity to publish your pieces, and to give you early experience with a competitive edge in the marketplace!'",
    //     domain: ["Chemistry","Computer/Info.technology","Engineering/Design"],
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     registrationType: 'string',
    //     participationType: 'string',
    //     paid: true,
    //     rewardPrize: 24000,
    //     challengeImage:
    //       'https://images.theconversation.com/files/340018/original/file-20200605-176546-1vkao9j.jpg?ixlib=rb-1.1.0&rect=7%2C30%2C5081%2C3357&q=45&auto=format&w=496&fit=clip',
    //     imageName: 'string',
    //     domains: [],
    //     documentUrl: 'string',
    //     registrations: 565,
    //     views: 504,
    //   },
    //   {
    //     challengeId: '3',
    //     challengerName: '',
    //     challengeName: 'Waste and Land pollution',
    //     description: 'Need urgent solution needed in ...... city near ........',
    //     rules: 'rule1....rule2',
    //     abstraction:
    //       "'All that you need to know about eSahayak Blogging Competition Week-3 eSahayak is back with the Blogging Competition. In this week we will select the top 5 published articles from eSahayak Blog and award them a certificate of excellence. Moreover, the top 2 blogs of the week will get a reward of INR 1,000 each.One person can submit as many articles as they want to. However, only one article submitted by an individual in a week will be considered for the prize money. But, submitting more articles will increase your chances of winning.We hope that this competition will provide you with an opportunity to publish your pieces, and to give you early experience with a competitive edge in the marketplace!'",
    //     domain: ["Physical Sciences","Request for Partners and Suppliers","Social innovation","Physical Sciences","Request for Partners and Suppliers","Social innovation"],
    //     startDate: new Date(),
    //     endDate: new Date("2021-08-16"),
    //     registrationType: 'string',
    //     participationType: 'string',
    //     paid: true,
    //     rewardPrize: 18000,
    //     challengeImage:
    //       'https://images.theconversation.com/files/340018/original/file-20200605-176546-1vkao9j.jpg?ixlib=rb-1.1.0&rect=7%2C30%2C5081%2C3357&q=45&auto=format&w=496&fit=clip',
    //     imageName: 'string',
    //     domains: [],
    //     documentUrl: 'string',
    //     registrations: 25,
    //     views: 147,
    //   }
    // ];
  }

  viewChallenge(challenge: Challenge) {
    const loggedInUser = localStorage.getItem("currentUser");
    if (challenge.challengerName == loggedInUser) {
      this.router.navigate(['/list-solutions',
      JSON.stringify({
        challengeId: challenge.challengeId,
      }),]);
    }else {
      localStorage.removeItem('chClicked');
      this.challengeService.updateViews(challenge.challengeId).subscribe();
      challenge.challengeImage = "https://assets.weforum.org/article/image/large_bg1B3jyBjInTSH2AjIgjgoER9PYwCN-BZ_BQhdeZ92s.jpg";
      this.router.navigate(['/challenge-desc', JSON.stringify(challenge)]);
    }
  }

  searchClick():void {
    // this.queries.error = "";
    if(this.queries.query == ""){
      this.ngOnInit();
    }else{
      this.searchService.searchByChallengeName(this.queries.query).subscribe( arr => {
        this.searchArr = arr;
        if(arr.length == 0) {
          // this.queries.error = "No Results Found";
          this.subscribedDomainChallengeList = [];
        }else {
          console.log(arr);
          this.subscribedDomainChallengeList = arr;         // assigning search result to chall list

          /* filtering ch list for innovator and challenger*/
          if(this.url == 'find') {
            this.subscribedDomainChallengeList = this.subscribedDomainChallengeList.filter( cha =>
              cha.challengerName != localStorage.getItem("currentUser")
            );
          }
          else {
            this.subscribedDomainChallengeList = this.subscribedDomainChallengeList.filter( cha =>
              cha.challengerName == localStorage.getItem("currentUser")
            );
          }
        }
      });
    }
  }

  update_subscribedDomainChallengeList() {
    if(this.url == 'find') {
      this.subscribedDomainChallengeList = this.challengeList.filter( cha =>
        // cha.domain.filter( d => this.user.domain.includes(d));
        cha.domain.some( d => this.selectedChips.includes("All") ? this.user.domain.includes(d) : this.selectedChips.includes(d) )
        && cha.challengerName != localStorage.getItem("currentUser")
      );
    }
    else {
      this.subscribedDomainChallengeList = this.challengeList.filter( cha =>
        // cha.domain.filter( d => this.user.domain.includes(d));
        cha.challengerName == localStorage.getItem("currentUser") &&
        cha.domain.some( d => this.selectedChips.includes("All") ? this.user.domain.includes(d) : this.selectedChips.includes(d) )
      );
    }
    console.log("2.challengeList:",this.challengeList);
    console.log("2.subscribedDomainChallengeList:",this.subscribedDomainChallengeList);
  }

  onSelectionChangeAllChip(allChip: any){
    this.chipsValue$.subscribe((selected) => {
      let selectedChips = selected.map((x: string) => x.trim());
      if(selectedChips.length == 0){
        allChip.select();
      }
    });
  }

  onSelectionChange(chip: any,allChip: any){
    console.log("onSelectionChange: ",this.selectedChips,this.chipsControl.value);
    // this.a = this.chipsControl.value.map((x: string) => x.trim());
    if(chip.selected){
      allChip.deselect();
    } else {
      this.chipsValue$.subscribe((selected) => {
        let selectedChips = selected.map((x: string) => x.trim());
        if(selectedChips.length == 0){
          allChip.select();
        }
      });
    }
    this.chipsValue$.subscribe((selected) =>
      this.searchDomainChips = selected.map((x: string) => x.trim())
    );
    console.log("~onSelectionChange: ",this.selectedChips,this.chipsControl.value);
  }




  //Voice Recognition functions Start....................................................................................................
  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;

	initializeVoiceRecognitionCallback(): void {
    this.searchPlaceHolder = 'Starting';
		annyang.addCallback('error', (err: { error: string; }) => {
      if(err.error === 'network'){
        this.searchPlaceHolder = "No Internet Connection";
        annyang.abort();
        setTimeout(() => {
          this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
        },5000);
         // new 5
        
      } else if (this.voiceText === undefined) {
        
				this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('soundstart', (res: any) => {
      this.searchPlaceHolder = 'Listening....';
      this.ngZone.run(() => this.voiceActiveSectionListening = true);
      
		});

		annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.searchPlaceHolder = "No Internet Connection";
        this.ngZone.run(() => this.voiceActiveSectionError = true);
        this.searchPlaceHolder = "Search";
				annyang.abort();
			}
		});

		annyang.addCallback('result', (userSaid: any[]) => {
      this.searchPlaceHolder = 'Listening....';
			this.ngZone.run(() => this.voiceActiveSectionError = false);
      
			let queryText: any = userSaid[0];

			annyang.abort();

      this.voiceText = queryText;
      this.queries.query = this.voiceText; //new 1

			this.ngZone.run(() => this.voiceActiveSectionListening = false);
      this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
      this.searchClick(); // new 2
      
		});
	}

	startVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = false;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
    this.voiceText = undefined;
    this.queries.query = '';

		if (annyang) {
			let commands = {
				'demo-annyang': () => { }
			};

			annyang.addCommands(commands);

      this.initializeVoiceRecognitionCallback();

			annyang.start({ autoRestart: false });
		}
	}

	closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
		this.voiceActiveSectionListening = false;
		this.voiceText = undefined;
    this.searchPlaceHolder = 'Search'; // new 4
    this.queries.query = ''; // new 3

		if(annyang){
      annyang.abort();
    }
	}

}
