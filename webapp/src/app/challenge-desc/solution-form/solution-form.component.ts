import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"


@Component({
  selector: 'app-solution-form',
  templateUrl: './solution-form.component.html',
  styleUrls: ['./solution-form.component.css']
})
export class SolutionFormComponent implements OnInit {
  public challenge: any

  constructor(private route:ActivatedRoute) { }
  ngOnInit(): void {
    let challenge= this.route.snapshot.paramMap.get('chalDesc')
    this.challenge=challenge
  }

}
