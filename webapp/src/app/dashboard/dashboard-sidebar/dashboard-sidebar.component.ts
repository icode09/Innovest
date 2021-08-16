import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent implements OnInit {

  userName: any;
  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem("currentUser");
  }
  dashboardHome(){
    this.router.navigate(['home'],{relativeTo : this.route});
    // .then(() => { window.location.reload();});
  }
  gotoChallengeList(word:any) {
    this.router.navigate(['ch-list',word], { relativeTo: this.route });
  }
  mySolutionsList() {
    this.router.navigate([
      '/list-solutions',
      JSON.stringify({
        solvedBy: `${this.userName}`,
      }),
    ]);
  }

}