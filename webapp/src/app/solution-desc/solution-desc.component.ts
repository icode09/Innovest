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
  public activeFeedback: boolean = false;
  
  public showUpdateButton = false;
  public showFeedbackButton = false;
  public challenge: Challenge  = new Challenge("", "", "lkdsclmds", "", "","",["",""],["",""],new Date(),new Date(), "","",false,0,"","","",0,0);
  private challengeId: string = '';
  public challengername: string = '';
  public reviewComments: string[] = ["Hi changed this", "Changed that"];
  edit:boolean = false;
  feedback= new FormControl('');

  form:any;

  errorMessage = '';

  loading: boolean = false;
  selectedFiles: any;
  currentFileUpload: any;
  progress: { percentage: number } = { percentage: 0 };


  constructor(private route: ActivatedRoute, private _challengeService: CreatingchallengeService, private _sharingData: SharingDataService,
    private fb:FormBuilder,
    private uploadService : UploadfileService,
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
  raiseFeedback(){
    this.activeFeedback = true;
  }

  onEditSolution(){
    this.edit = true;
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
  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is uploaded!');
      }
    });
    this.selectedFiles = undefined;
  }
  submitSolution() {
    this.loading = true;
    if (
      this.form.solutionTitle === '' ||
      this.form.solutionDescription === ''
    ) {
      this.errorMessage = 'Fields cannot be empty';
      alert(this.errorMessage);
      return;
    }
    this.submitService.addSolution(this.form).subscribe(
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
          'NotReviewed'
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
}
