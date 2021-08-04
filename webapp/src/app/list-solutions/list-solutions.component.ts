import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solution } from '../common/solution';
import {GetSolutionsService} from '../get-solutions.service'

@Component({
  selector: 'app-list-solutions',
  templateUrl: './list-solutions.component.html',
  styleUrls: ['./list-solutions.component.css']
})
export class ListSolutionsComponent implements OnInit {

  public identifier: any;
  constructor(private route: ActivatedRoute, private getSolutionsService : GetSolutionsService) { }
  public solutions : Solution[] | undefined
  ngOnInit(): void {
    let identifier = JSON.parse(
      this.route.snapshot.paramMap.get('identifier') || '{}'
    );
    this.identifier = identifier
    if(identifier.challengeId){
      this.getSolutionsService.getSolutionsByChallengeId(identifier.challengeId).subscribe((result)=>{
          this.solutions= result
          console.log(result)
      })
    }
    if(identifier.solvedBy){
      this.getSolutionsService.getSolutionsBySolvedBy(identifier.solvedBy).subscribe((result)=>{
          this.solutions= result
          console.log(result)
      })
    }
  }



}