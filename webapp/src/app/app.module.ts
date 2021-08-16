import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChallengeDescComponent } from './challenge-desc/challenge-desc.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SolutionFormComponent } from './challenge-desc/solution-form/solution-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { CreateChallengeComponent } from './create-challenge/create-challenge.component';

import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInput, MatInputModule } from '@angular/material/input';
import { HeaderLandingPageComponent } from './header-landing-page/header-landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { SubmitSolutionService } from './submit-solution.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SearchService } from './search.service';
import {MatSelectModule} from '@angular/material/select';
import { PaymentComponent } from './payment/payment.component';
import { ListSolutionsComponent } from './list-solutions/list-solutions.component';
import { MaterialElevationDirective } from './material-elevation.directive';
import { CommonModule } from '@angular/common';
import { SolutionDescComponent } from './solution-desc/solution-desc.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SharingDataService } from './sharing-data.service';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ProgressBarModule} from "angular-progress-bar";
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { DashboardSidebarComponent } from './dashboard/dashboard-sidebar/dashboard-sidebar.component'

@NgModule({
  declarations: [
    AppComponent,
    ChallengeDescComponent,
    SolutionFormComponent,
    PageNotFoundComponent,
    DashboardComponent,
    ChallengeListComponent,
    CreateChallengeComponent,
    LoginComponent,
    HeaderLandingPageComponent,
    SignupComponent,
    AlertDialogComponent,
    PaymentComponent,
    ListSolutionsComponent,
    MaterialElevationDirective,
    SolutionDescComponent,
    ProfileComponent,
    FeedbackComponent,
    DashboardHomeComponent,
    DashboardSidebarComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    HttpClientModule,
    MatSidenavModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    ProgressBarModule
  ],
  providers: [SubmitSolutionService, SearchService, SharingDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
