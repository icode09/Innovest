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

  selectedFile!: File;

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
      'NotReviewed',
      []
    );
  }


  public onFileChanged(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
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

    const item =this.formData ;
    const uploadFileData = new FormData();
    console.log('file:', this.selectedFile);
    uploadFileData.append('input', JSON.stringify(item));
    uploadFileData.append('file', this.selectedFile);
    this.submitService.addSolution(uploadFileData).subscribe(
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
          'NotReviewed',
          []
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
      console.log(result)
      if(!result){
        this.router.navigate(['/dashboard'])
      }

    });
  }
  
}

