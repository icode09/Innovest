import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  form: any = {}
  isSuccessful = false;
  errorMessage = '';
  constructor(private http:HttpClient, private router : Router) { }

  ngOnInit(): void {
  }


  sendFeedback():void{
    if(this.form.invalid){
      return;
    }
    let url = "/api/v1/feedback/feedback";
    this.http.post(url, this.form).subscribe(
      (data) => {
        console.log("data:",data);
        this.isSuccessful = true;
        this.router.navigate(['/login'])
        // this.router.navigate(['login'], {queryParams: { registered: 'true' } });
      },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occurred.");
      }
    }
    );
  }
    
}

export interface Feedback{
  name: string;
  email: string;
  subject: string;
}
