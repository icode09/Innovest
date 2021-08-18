import { Component, OnInit } from '@angular/core';

import { ChallengeService } from '../challenge.service';
import {v4 as uuidv4} from 'uuid';
import { FormBuilder, Validators } from '@angular/forms';
import { StartEndDateValidator } from '../shared/OrderChecker.validator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css'],
})
export class CreateChallengeComponent implements OnInit {
  handler:any = null;
  amount:any;
  domainList: String[] = ["Business & Entepreneurship","Chemistry","Computer/Info.technology","Engineering/Design","Environment","Food/Agriculture","Life Sciencess","Math/Statistics","Physical Sciences","Request for Partners and Suppliers","Social innovation"];

  ngOnInit(){
    this.loadStripe();
  }
  submitted = false;

  constructor(private fb: FormBuilder, private challengeService: ChallengeService, private router:Router){}
  
  createChallengeForm = this.fb.group({
    challengeId : [uuidv4()],
    challengerName : [''],
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
    rewardPrize : [0],
    registrationType : ['', Validators.required],
    participationType : ['', Validators.required],
    imageName : [''],
    
  }, {validator : StartEndDateValidator});
  
  selectedFile: any;
public onFileSubmit(event:any) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }
  onSubmit(){
    this.submitted =true;
    const loggedInUser = localStorage.getItem('currentUser');
    this.createChallengeForm.value.challengerName = loggedInUser;
    const item =this.createChallengeForm.value ;
    const uploadFileData = new FormData();
    console.log('file:', this.selectedFile);
    uploadFileData.append('input', JSON.stringify(item));
    uploadFileData.append('file', this.selectedFile);
    this.challengeService.createChallenge(uploadFileData)
    .subscribe(
      response => console.log('Success!', response),
      error => console.log('Error!', error)

    );
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 500);
  }
  pay(rewardPrize:any) {    
  
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JKLrwSAQeukN9L81vhY7IqniVtz7WRhCd8filel69EzUAjbG9wdnl8qdMYcKoCM6l8YXptbzlgybWoZlPurBW4g00slp67OCL',
      locale: 'auto',
      token: function (token: any) {
        console.log(token)
        //alert('Token Created!!');
      }
    });

    handler.open({
      name: 'Innovest',
      description: 'payment widget',
      rewardPrize: rewardPrize*100

    });
  }
  loadStripe() {
      
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JKLrwSAQeukN9L81vhY7IqniVtz7WRhCd8filel69EzUAjbG9wdnl8qdMYcKoCM6l8YXptbzlgybWoZlPurBW4g00slp67OCL',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
        
      window.document.body.appendChild(s);
    }
  }
  
 
}
