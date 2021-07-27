import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private sidebarService: SharedDataService) { }

  get isSidebarVisible(): boolean {
      return this.sidebarService.isSidebarVisible;
  }

  toggleSidebar() {
      console.log("in toggle Headers")
      this.sidebarService.toggleSidebarVisibility()
  }
}
