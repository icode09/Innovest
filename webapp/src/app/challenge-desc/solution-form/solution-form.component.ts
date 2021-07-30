import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solution } from '../../common/solution';
import { SubmitSolutionService } from '../../submit-solution.service';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-solution-form',
  templateUrl: './solution-form.component.html',
  styleUrls: ['./solution-form.component.css'],
})
export class SolutionFormComponent implements OnInit {
  loading: boolean = false;
  public challenge: any;
  errorMessage = '';
  public formData = new Solution(
    '',
    '',
    '',
    '',
    '110841e3-e6fb-4191-8fd8-5674a5107c33',
    '110841e3-e6fb-4191-8fd8-5674a5107c33'
  );
  constructor(
    private route: ActivatedRoute,
    private submitService: SubmitSolutionService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    let challenge = JSON.parse(
      this.route.snapshot.paramMap.get('chalDesc') || '{}'
    ); //https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
    this.challenge = challenge;
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
          '110841e3-e6fb-4191-8fd8-5674a5107c33',
          '110841e3-e6fb-4191-8fd8-5674a5107c33'
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
      window.location.reload();
    });
  }
}
