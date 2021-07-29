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
    let challenge= JSON.parse(this.route.snapshot.paramMap.get('chalDesc')||'{}') //https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
    this.challenge=challenge
  }

}
