import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  userName: any;
  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem("currentUser");
    // if(this.userName==null) {
    //   this.router.navigate(['../login']);
    // }
  }

  myChallengeList() {
    this.router.navigate(['ch-list'], { relativeTo: this.route });
  }
  createChallenge() {
    this.router.navigate(['create-ch'], { relativeTo: this.route }).then(() => {
      window.location.reload();
    });
  }
  mySolutionsList() {
    this.router.navigate([
      '/list-solutions',
      JSON.stringify({
        solvedBy: `${localStorage.getItem('currentUser')}`,
      }),
    ]);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
