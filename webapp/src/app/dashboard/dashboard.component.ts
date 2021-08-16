import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName:any;
  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem("currentUser");
  }
  myProfile(){
    this.router.navigate(['profile'],{relativeTo : this.route});
      // .then(() => {window.location.reload();});
  }
  createChallenge() {
    this.router.navigate(['create-ch'], { relativeTo: this.route }).then(() => {
      window.location.reload();
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }

}
