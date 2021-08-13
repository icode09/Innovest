import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Solution } from '../common/solution';
import { GetSolutionsService } from '../get-solutions.service';
import { SharingDataService } from '../sharing-data.service';
import { SubmitSolutionService } from '../submit-solution.service';

@Component({
  selector: 'app-list-solutions',
  templateUrl: './list-solutions.component.html',
  styleUrls: ['./list-solutions.component.css'],
})
export class ListSolutionsComponent implements OnInit {
  public identifier: any;
  constructor(
    private route: ActivatedRoute,
    private getSolutionsService: GetSolutionsService,
    private submitSolutionService: SubmitSolutionService,
    private router: Router,
    private _sharingData: SharingDataService
  ) {}
  public solutions: Solution[] | undefined;
  ngOnInit(): void {
    let identifier = JSON.parse(
      this.route.snapshot.paramMap.get('identifier') || '{}'
    );
    this.identifier = identifier;
    if (identifier.challengeId) {
      this.getSolutionsService
        .getSolutionsByChallengeId(identifier.challengeId)
        .subscribe((result) => {
          this.solutions = result;
          console.log(result);
        });
    }
    if (identifier.solvedBy) {
      this.getSolutionsService
        .getSolutionsBySolvedBy(identifier.solvedBy)
        .subscribe((result) => {
          this.solutions = result;
          console.log(result);
        });
    }
    
    
  }

  acceptSolution(solutionId: string, solutionStatus: string) {
    // solution.solutionStatus = 'Accepted';
    this.submitSolutionService.updateSolutionStatus(solutionId,solutionStatus).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }
  onSelect(solution : Solution){
    this.router.navigate(['solnDesc', JSON.stringify(solution)]);
    this._sharingData.setChallengeId(solution.challengeId);
  }
  
}
