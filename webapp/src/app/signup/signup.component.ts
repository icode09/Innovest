import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  domains = new FormControl();
  domainList : string[] = ['Environment' , 'Power' , "AutoMobile" , "Aerospace" , "Infrastructure"];
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log("form details:", this.form);
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
