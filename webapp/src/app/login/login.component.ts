import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginform : FormGroup;
  isLoginFailed = false;
  errorMessage = '';
  constructor(private authService:AuthServiceService , private route:ActivatedRoute) { 
    this.loginform=new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),

    })

  }
  infoMessage = '';
  ngOnInit(): void{
    this.route.queryParams
      .subscribe(params => {
        if(params.registered !== undefined && params.registered === 'true') {
            this.infoMessage = 'Registration Successful! Please Login!';
        }
      });
  }
  
  signIn(){
      this.authService.login(this.loginform.value).subscribe((res)=>{
       
        this.authService.storeToken(res["token"],res["email"]);
        this.authService.opendashboard();
        this.isLoginFailed = false;
        
      }
      ,
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      })
    }
      
    }
  


