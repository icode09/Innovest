import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Challenge } from '../common/challenge';
import { Solution } from '../common/solution';
import { CreatingchallengeService } from '../creatingchallenge.service';
import { SharingDataService } from '../sharing-data.service';


@Component({
  selector: 'app-solution-desc',
  templateUrl: './solution-desc.component.html',
  styleUrls: ['./solution-desc.component.css']
})
export class SolutionDescComponent implements OnInit {
  public loggedInUser = localStorage.getItem("currentUser");
  public solution: Solution;
  
  public showUpdateButton = false;
  public showFeedbackButton = false;
  public challenge: Challenge  = new Challenge("", "", "lkdsclmds", "", "","",["",""],["",""],new Date(),new Date(), "","",false,0,"","","",0,0);
  private challengeId: string = '';
  public challengername: string = '';
  
  constructor(private route: ActivatedRoute, private _challengeService: CreatingchallengeService, private _sharingData: SharingDataService) {
    let sol = JSON.parse(this.route.snapshot.paramMap.get('solution') || '{}');
    this.solution = sol;
    console.log(this.showFeedbackButton);
          
  }

  ngOnInit(): void {
    
    this.challengeId =  this._sharingData.getChallengeId();
    
    this._challengeService
      .getChallengeByChallengeId(this.challengeId)
      .subscribe((result) => { 
        this.challenge = result;
        this._sharingData.shareChallengerName = result.challengerName;
        if (this.loggedInUser == result.challengerName){
          this.showFeedbackButton = true;
          console.log(this.showFeedbackButton);
          console.log(this.loggedInUser == result.challengerName)
        }
      }); 
      if (this.loggedInUser == this.solution.solvedBy) {
        this.showUpdateButton = true;
      }
      console.log(this.showFeedbackButton);
      

      
    
  }
  




}
