import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username : any;

  constructor(private auth : AuthServiceService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("currentUser");
    
  }

}
