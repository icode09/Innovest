import { GetProfileService } from './../get-profile.service';
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
  edit: boolean = false;
  form: any = {};
  isSuccessful = false;
  errorMessage = '';
  domainList : string[] =["Business & Entepreneurship","Chemistry","Computer/Info.technology","Engineering/Design","Environment","Food/Agriculture","Life Sciencess","Math/Statistics","Physical Sciences","Request for Partners and Suppliers","Social innovation"]

  
  
  constructor(private auth : AuthServiceService,private getProfile : GetProfileService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("currentUser");
    this.getProfile.getUserDetails(this.username).subscribe((res)=>{
      this.user = res;
      console.log(res);
    });
  }

  editProfile() {
    this.edit = true;
}
goBack() {
  this.edit = false;
}
onSubmit(){
  if(this.form.invalid){
    return;
  }
  console.log("form details:", this.form);
  this.auth.updateUser(this.form).subscribe(
    (data) => {
      this.isSuccessful = true;
      this.goBack();
    },
    err => {
      console.log("error:",err);
      this.errorMessage = err.error;
    }
  );
}
}
