import { UploadfileService } from 'src/app/uploadfile.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
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
  styleUrls: ['./solution-desc.component.css'],
})
export class SolutionDescComponent implements OnInit {
  public loggedInUser = localStorage.getItem('currentUser');
  public solution: Solution;

  public showUpdateButton = false;
  public showFeedbackButton = false;
  public challenge: Challenge = new Challenge(
    '',
    '',
    '',
    '',
    '',
    '',
    ['', ''],
    ['', ''],
    new Date(),
    new Date(),
    '',
    '',
    false,
    0,
    '',
    '',
    '',
    0,
    0
  );
  private challengeId: string = '';
  public challengername: string = '';
  public reviewComments: string[] = [];
  public fileChanged = false;
  edit: boolean = false;
  feedbackForm = new FormGroup({
    comment: new FormControl(''),
    commentedBy: new FormControl('')
    });

  form: any;

  errorMessage = '';
  selectedFile!: File;
  loading: boolean = false;
  selectedFiles: any;
  currentFileUpload: any;
  progress: { percentage: number } = { percentage: 0 };
  activeFeedback: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _challengeService: CreatingchallengeService,
    private _sharingData: SharingDataService,
    private fb: FormBuilder,
    private submitService: SubmitSolutionService,
    public dialog: MatDialog,
    private router: Router
  ) {
    let sol = JSON.parse(this.route.snapshot.paramMap.get('solution') || '{}');
    this.solution = sol;
    console.log(this.showFeedbackButton);
  }

  ngOnInit(): void {
    this.challengeId = this.solution.challengeId;

    this.submitService.getSolutionById(this.solution.solutionId).subscribe((data)=> {
      this.solution= data;
    })
    this._challengeService
      .getChallengeByChallengeId(this.challengeId)
      .subscribe((result) => {
        this.challenge = result;
        this._sharingData.shareChallengerName = result.challengerName;
        if (this.loggedInUser == result.challengerName) {
          this.showFeedbackButton = true;
          console.log(this.showFeedbackButton);
          console.log(this.loggedInUser == result.challengerName);
        }
      });
    if (this.loggedInUser == this.solution.solvedBy) {
      this.showUpdateButton = true;
    }
    console.log(this.showFeedbackButton);
  }

  onEditSolution() {
    if (!this.edit) this.edit = true;
    else this.edit = false;

    this.initForm();
  }
  initForm() {
    console.log('initializing form');
    this.form = this.fb.group({
      solutionId: [''],
      solutionTitle: [''],
      solutionDescription: [''],
      codeUrl: [''],
    });
    this.form.get('solutionId').setValue(this.solution.solutionId);
    this.form.get('solutionTitle').setValue(this.solution.solutionTitle);
    this.form
      .get('solutionDescription')
      .setValue(this.solution.solutionDescription);
    this.form.get('codeUrl').setValue(this.solution.codeUrl);

    console.log(this.form);
  }

  public onFileChanged(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.fileChanged = true;
  }

  submitSolution() {
    this.loading = true;
    // const uploadFileData = new FormData();
    // if (
    //   this.form.solutionTitle === '' ||
    //   this.form.solutionDescription === ''
    // ) {
    //   this.errorMessage = 'Fields cannot be empty';
    //   alert(this.errorMessage);
    //   return;
    // }
    if (this.fileChanged) {
      console.log('file changed');
      const item = this.form.value;
      const uploadFileData = new FormData();
      console.log('file:', this.selectedFile);
      uploadFileData.append('input', JSON.stringify(item));
      uploadFileData.append('file', this.selectedFile);
      this.submitService.updateFile(uploadFileData).subscribe(
        (result) => {
          this.loading = false;
          this.form = new Solution(
            result.solutionId,
            result.solutionTitle,
            result.solutionDescription,
            result.codeUrl,
            result.documentUrl,
            `${this.challenge.challengeId}`,
            `${localStorage.getItem('currentUser')}`,
            'NotReviewed',
            []
          );
          console.log(result);
          this.routeToList();
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
    } else {
      console.log('file not changed');
      const item = this.form.value;
      const uploadFileData = new FormData();
      uploadFileData.append('input', JSON.stringify(item));
      this.submitService.updateSolution(uploadFileData).subscribe(
        (result) => {
          this.loading = false;
          this.form = new Solution(
            result.solutionId,
            result.solutionTitle,
            result.solutionDescription,
            result.codeUrl,
            result.documentUrl,
            `${this.challenge.challengeId}`,
            `${localStorage.getItem('currentUser')}`,
            'NotReviewed',
            []
          );
          console.log(result);
          this.routeToList();
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
  }
  openDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: { message: 'this.errorMessage' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/dashboard']);
    });
  }
  raiseFeedback() {
    this.activeFeedback = true;
  }

  onfbSubmit() {
    this.activeFeedback = false;
    this.feedbackForm.value.commentedBy = this.loggedInUser;
    console.log(this.feedbackForm.value);
    this.submitService.updateReviewComments(this.solution.solutionId,this.feedbackForm.value)
    .subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  routeToList() {
    this.router.navigate([
      'list-solutions',
      JSON.stringify({
        solvedBy: `${this.loggedInUser}`,
      }),
    ]);
  }

  openTab(url: any) {
    window.open(url, "_blank");
  }
}
//comment is here
