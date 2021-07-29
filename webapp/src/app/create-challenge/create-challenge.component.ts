import { Component, OnInit } from '@angular/core';
import { Challenge } from '../challenge';
import { CreatingchallengeService } from '../creatingchallenge.service';
@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css']
})
export class CreateChallengeComponent implements OnInit {

  constructor(private _creatingChallenge: CreatingchallengeService) { }

  ngOnInit(): void {
  }

   challengeModel = new Challenge("Challenge Name", "Description", "",new Date(),new Date(),"","",true,"","")

  onSubmit(){
    this._creatingChallenge.createChallenge(this.challengeModel)
    .subscribe(
      data => console.log('Success!', data),
      error => console.log('Error!', error)
    )
  }
}
