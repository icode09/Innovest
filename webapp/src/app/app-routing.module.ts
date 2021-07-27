import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeDescComponent } from './challenge-desc/challenge-desc.component';
import { SolutionFormComponent } from './challenge-desc/solution-form/solution-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {LandingPageComponent} from './landing-page/landing-page.component'

const routes: Routes = [
  { path: '', component:LandingPageComponent },
  { path: 'challenge-desc', component: ChallengeDescComponent },
  { path: 'solution-form', component: SolutionFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ch-list', component: ChallengeListComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
  {path : 'signup',component : SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
