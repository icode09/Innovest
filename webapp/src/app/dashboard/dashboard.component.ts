import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  }

  myChallengeList() {
    this.router.navigate(['ch-list'],{relativeTo: this.route});
  }
  createChallenge() {
    this.router.navigate(['create-ch'],{relativeTo: this.route});
  }
  mySolutionsList(){
    this.router.navigate([
      '/list-solutions',
      JSON.stringify({
        solvedBy:"110841e3-e6fb-4191-8fd8-5674a5107c33"
      }),
    ]);
  }
}
