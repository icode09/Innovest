import { GetProfileService } from './../get-profile.service';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  username: any;
  user: any;
  edit: boolean = false;
  form: any = {};
  isSuccessful = false;
  errorMessage = '';
  domainList: string[] = [
    'Business & Entepreneurship',
    'Chemistry',
    'Computer/Info.technology',
    'Engineering/Design',
    'Environment',
    'Food/Agriculture',
    'Life Sciencess',
    'Math/Statistics',
    'Physical Sciences',
    'Request for Partners and Suppliers',
    'Social innovation',
  ];

  constructor(
    private route : Router,
    private auth: AuthServiceService,
    private getProfile: GetProfileService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser');
    this.getProfile.getUserDetails(this.username).subscribe((res) => {
      this.user = res;
      console.log(res);
    });
  }

  editProfile() {
    this.edit = true;
    this.initForm();
  }

  initForm() {
    console.log("initializing form");
    this.form = this.fb.group({
      userId: [''],
      displayName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password:['', [Validators.required]],
      matchingPassword: ['', [Validators.required]],
      domain: [''],
      bio: [''],
    });
    this.form.get('userId').setValue(this.user.userId);
    this.form.get('displayName').setValue(this.user.displayName);
    this.form.get('email').setValue(this.user.email);
    this.form.get('password').setValue(this.user.password);
    this.form.get('matchingPassword').setValue(this.user.password);
    this.form.get('domain').setValue(this.user.domain);
    this.form.get('bio').setValue(this.user.bio);
    console.log(this.form);
  }
  goBack() {
    this.edit = false;
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log('form details:', this.form.value);
    this.auth.updateUser(this.form.value).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.route.navigate(['/dashboard/profile']);
        this.goBack();

      },
      (err) => {
        console.log('error:', err);
        this.errorMessage = err.error;
      }
    );
  }
}
