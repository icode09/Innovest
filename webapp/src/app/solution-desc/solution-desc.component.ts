import { UploadfileService } from 'src/app/uploadfile.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Challenge } from '../common/challenge';
import { Solution } from '../common/solution';
import { CreatingchallengeService } from '../creatingchallenge.service';
import { SharingDataService } from '../sharing-data.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { SubmitSolutionService } from '../submit-solution.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-solution-desc',
  templateUrl: './solution-desc.component.html',
  styleUrls: ['./solution-desc.component.css']
})
export class SolutionDescComponent implements OnInit {
  public loggedInUser = localStorage.getItem("currentUser");
  public solution: Solution;
  
  public showUpdateButton = false;
  public showFeedbackButton = false;
  public challenge: Challenge  = new Challenge("", "", "", "", "","",["",""],["",""],new Date(),new Date(), "","",false,0,"","","",0,0);
  private challengeId: string = '';
  public challengername: string = '';
  public reviewComments: string[] = ["Hi changed this", "Changed that"];
  edit:boolean = false;
  feedback= new FormControl('');

  form:any;

  errorMessage = '';
  selectedFile!: File;
  loading: boolean = false;
  selectedFiles: any;
  currentFileUpload: any;
  progress: { percentage: number } = { percentage: 0 };
  activeFeedback :boolean = false;

  constructor(private route: ActivatedRoute, private _challengeService: CreatingchallengeService, private _sharingData: SharingDataService,
    private fb:FormBuilder,
    private submitService: SubmitSolutionService,
    public dialog: MatDialog,
    private router: Router) {
    let sol = JSON.parse(this.route.snapshot.paramMap.get('solution') || '{}');
    this.solution = sol;
    console.log(this.showFeedbackButton);
          
  }

  ngOnInit(): void {
    
    this.challengeId =  this._sharingData.getChallengeId();
    
    this._challengeService
      .getChallengeByChallengeId(this.challengeId)
      .subscribe((result) => { 
        this.challenge = result;
        this._sharingData.shareChallengerName = result.challengerName;
        if (this.loggedInUser == result.challengerName){
          this.showFeedbackButton = true;
          console.log(this.showFeedbackButton);
          console.log(this.loggedInUser == result.challengerName)
        }
      }); 
      if (this.loggedInUser == this.solution.solvedBy) {
        this.showUpdateButton = true;
      }
      console.log(this.showFeedbackButton);
      

      
    
  }
  


  onEditSolution(){
    if(!this.edit) this.edit = true;
    else this.edit = false;
    
    this.initForm();
  }
  initForm() {
    console.log("initializing form");
    this.form = this.fb.group({
      'solutionId' : [''],
      'solutionTitle' : [''],
      'solutionDescription' : [''],
      'codeUrl' : ['']
    });
    this.form.get('solutionId').setValue(this.solution.solutionId);
    this.form.get('solutionTitle').setValue(this.solution.solutionTitle);
    this.form.get('solutionDescription').setValue(this.solution.solutionDescription);
    this.form.get('codeUrl').setValue(this.solution.codeUrl);
    
    console.log(this.form);
  }

  public onFileChanged(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  submitSolution() {
    this.loading = true;
    const uploadFileData = new FormData();
    if (
      this.form.solutionTitle === '' ||
      this.form.solutionDescription === ''
    ) {
      this.errorMessage = 'Fields cannot be empty';
      alert(this.errorMessage);
      return;
    }
    this.submitService.updateSolution(this.form,uploadFileData).subscribe(
      (result) => {
        this.loading = false;
        this.form = new Solution(
          '',
          '',
          '',
          '',
          '',
          `${this.challenge.challengeId}`,
          `${localStorage.getItem('currentUser')}`,
          'NotReviewed',
          ['']
        );
        this.errorMessage = '';
        this.openDialog();
        console.log(result);
      },
      (error) => {
        this.loading = false;
        this.errorMessage =
          'Please try again. Error status: ' +
          error.status +
          +'  Error message: ' +
          error.message;
        this.openDialog();
      }
    );
  }
  openDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: { message: this.errorMessage },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/dashboard'])
    });
  }
  raiseFeedback(){
    this.activeFeedback = true;
  }
}
