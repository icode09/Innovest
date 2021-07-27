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
  constructor(private authService:AuthServiceService) { 
    this.loginform=new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])

    })

  }

  ngOnInit(): void{

  }
  
  loginProcess(){
    
      this.authService.login(this.loginform.value).subscribe((res)=>{
        this.authService.storeToken(res["token"]);
        console.log(res);
        
      })
    }
  

}
