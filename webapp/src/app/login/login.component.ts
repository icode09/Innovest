import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginform : FormGroup;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService:AuthServiceService) { 
    this.loginform=new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),

    })

  }

  ngOnInit(): void{

  }
  
  signIn(){
      this.authService.login(this.loginform.value).subscribe((res)=>{
       
          this.authService.storeToken(res["token"]);
        this.authService.opendashboard();
        this.isSignUpFailed = false;
        
      }
      ,
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      })
    }
      
    }
  


