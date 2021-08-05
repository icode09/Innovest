import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router} from '@angular/router';

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

  
  constructor(private authService: AuthServiceService,private router : Router) { }
  

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.form.invalid){
      return;
    }
    console.log("form details:", this.form);
    this.authService.register(this.form).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['login'], {queryParams: { registered: 'true' } });
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
