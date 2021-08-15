import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SharingDataService{
  
  shareChallengerName: string = '';
  challengeId:string = '';
  
  setChallengeId(name: string){
    this.challengeId = name;

  }
  getChallengeId() {
    return this.challengeId;
  }
  
  constructor() { console.log(console.log(this.shareChallengerName))}
  
  



  
}
