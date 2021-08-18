import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeDescComponent } from './challenge-desc/challenge-desc.component';
import { SolutionFormComponent } from './challenge-desc/solution-form/solution-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreateChallengeComponent } from './create-challenge/create-challenge.component';
import {ListSolutionsComponent} from './list-solutions/list-solutions.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SolutionDescComponent } from './solution-desc/solution-desc.component';
import { AuthGuard } from './auth.guard';
import { HeaderLandingPageComponent } from './header-landing-page/header-landing-page.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'challenge-desc/:chalDesc', component: ChallengeDescComponent},
  { path: 'solution-form/:chalDesc', component: SolutionFormComponent },
  { path: 'list-solutions/:identifier', component: ListSolutionsComponent},
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'home', component: DashboardHomeComponent },
      { path: 'ch-list/:list', component: ChallengeListComponent },
      { path: 'create-ch', component: CreateChallengeComponent },
      { path: 'profile', component : ProfileComponent},
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'feedback', component: FeedbackComponent},
  { path: 'solnDesc/:solution', component: SolutionDescComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
//updates made in path: 'solnDesc/:solution', component: SolutionDescComponent