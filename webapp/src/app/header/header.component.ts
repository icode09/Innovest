import { Component, OnInit } from '@angular/core';
import {SharedDataService} from '../shared-data.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private sharedDataService: SharedDataService) { }
  ngOnInit(): void {
    this.sharedDataService.showSideNav=false;
  }
  setdata(){
    this.sharedDataService.showSideNav= !this.sharedDataService.showSideNav
  }

}
