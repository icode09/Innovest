import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Solution } from '../../common/solution';
import { SubmitSolutionService } from '../../submit-solution.service';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UploadfileService } from 'src/app/uploadfile.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-solution-form',
  templateUrl: './solution-form.component.html',
  styleUrls: ['./solution-form.component.css'],
})
export class SolutionFormComponent implements OnInit {
  loading: boolean = false;
  public challenge: any;
  public formData: any;
  errorMessage = '';


  selectedFiles: any;
  currentFileUpload: any;
  progress: { percentage: number } = { percentage: 0 };
  constructor(
    private route: ActivatedRoute,
    private submitService: SubmitSolutionService,
    public dialog: MatDialog,
    private router: Router,
    private uploadService: UploadfileService
  ) {}
  ngOnInit(): void {
    let challenge = JSON.parse(
      this.route.snapshot.paramMap.get('chalDesc') || '{}'
    ); //https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
    this.challenge = challenge;
    this.formData = new Solution(
      '',
      '',
      '',
      '',
      '',
      `${this.challenge.challengeId}`,
      `${localStorage.getItem('currentUser')}`,
      'NotReviewed'
    );
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

  goBack() {
    window.history.back();
  }
  

  submitSolution() {
    this.loading = true;
    if (
      this.formData.solutionTitle === '' ||
      this.formData.solutionDescription === ''
    ) {
      this.errorMessage = 'Fields cannot be empty';
      alert(this.errorMessage);
      return;
    }
    this.submitService.addSolution(this.formData).subscribe(
      (result) => {
        this.loading = false;
        this.formData = new Solution(
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

