import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  model:Feedback = {
    name:'',
    email:'',
    subject:''
  };
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  sendFeedback():void{
    let url = "http://localhost:8070/api/v1/feedback/feedback";
    this.http.post(url, this.model).subscribe(
      res => {
        console.log(res);
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
