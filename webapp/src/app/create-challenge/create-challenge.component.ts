import { Component, OnInit } from '@angular/core';
import { Challenge } from '../challenge';
import { CreatingchallengeService } from '../creatingchallenge.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css'],
})
export class CreateChallengeComponent implements OnInit {
  constructor(private _creatingChallenge: CreatingchallengeService) {}

  ngOnInit(): void {}

  challengeModel = new Challenge(
    uuidv4(),
    uuidv4(),
    'Challenge Name',
    'Description',
    '',
    new Date(),
    new Date(),
    '',
    '',
    true,
    '',
    '',
    '',
    '',
    0,
    [0, 0],
    0,
    0
  );

  onSubmit() {
    this.challengeModel.challengeId = uuidv4();
    this.challengeModel.challengerId = uuidv4();
    this._creatingChallenge.createChallenge(this.challengeModel).subscribe(
      (data) => console.log('Success!', data),
      (error) => console.log('Error!', error)
    );
  }
}
