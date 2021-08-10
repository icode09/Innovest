import { UserProfile } from './../common/user-profile';
import { GetProfileService } from './../get-profile.service';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username : any;
  user : any;
  
  constructor(private auth : AuthServiceService,private getProfile : GetProfileService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("currentUser");
    this.getProfile.getUserDetails(this.username).subscribe((res)=>{
      this.user = res;
      console.log(res);
    });
  }

}
