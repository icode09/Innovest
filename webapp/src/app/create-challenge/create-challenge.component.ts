import { Component, OnInit } from '@angular/core';

import { CreatingchallengeService } from '../creatingchallenge.service';
import {v4 as uuidv4} from 'uuid';
import { FormBuilder, Validators } from '@angular/forms';
import { StartEndDateValidator } from '../shared/OrderChecker.validator';


@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css']
})
export class CreateChallengeComponent implements OnInit {
  
  ngOnInit(){}
  submitted = false;

  constructor(private fb: FormBuilder, private  _createChallengeService: CreatingchallengeService){}
  
  createChallengeForm = this.fb.group({
    challengeId : [uuidv4()],
    challengerId : [uuidv4()],
    challengeName : ['', [Validators.required, Validators.minLength(3)]],
    description : ['', Validators.required],
    domain : [null, Validators.required],
    rules : ['', Validators.required],
    abstraction : ['', Validators.required],
    startDate : [null, Validators.required],
    endDate : [null, Validators.required],
    paid : [false],
    challengeImage : [[0,0]],
    documentUrl : [''],
    registrations:[0],
    views:[0],
    rewardPrize : [null, Validators.required],
    registrationType : ['', Validators.required],
    participationType : ['', Validators.required],
    amount: [0]
  }, {validator : StartEndDateValidator});
  
  domainList = ["Business & Entepreneurship","Chemistry","Computer/Info.technology","Engineering/Design","Environment","Food/Agriculture","Life Sciencess","Math/Statistics","Physical Sciences","Request for Partners and Suppliers","Social innovation"];

  onSubmit(){
    this.submitted =true;
    console.log(this.createChallengeForm.value);
    this._createChallengeService.createChallenge(this.createChallengeForm.value)
    .subscribe(
      response => console.log('Success!', response),
      error => console.log('Error!', error)
    );
  }

 
}
