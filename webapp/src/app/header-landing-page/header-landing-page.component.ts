import { Component, OnInit } from '@angular/core';
import {SharedDataService} from '../shared-data.service'

@Component({
  selector: 'app-header-landing-page',
  templateUrl: './header-landing-page.component.html',
  styleUrls: ['./header-landing-page.component.css']
})
export class HeaderLandingPageComponent implements OnInit {

  userName: any;
  loggedIn: any;

  ngOnInit(): void {
    this.userName = localStorage.getItem("currently logged in user");
    console.log("username:", this.userName);
    if (this.userName != null) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }
  constructor(private sidebarService: SharedDataService) { }

  get isSidebarVisible(): boolean {
      return this.sidebarService.isSidebarVisible;
  }

  toggleSidebar() {
      console.log("in toggle Headers")
      this.sidebarService.toggleSidebarVisibility()
  }

}
