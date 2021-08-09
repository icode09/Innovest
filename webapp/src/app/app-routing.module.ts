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
import { HeaderLandingPageComponent } from './header-landing-page/header-landing-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreateChallengeComponent } from './create-challenge/create-challenge.component';
import {ListSolutionsComponent} from './list-solutions/list-solutions.component'

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'challenge-desc/:chalDesc', component: ChallengeDescComponent },
  { path: 'solution-form/:chalDesc', component: SolutionFormComponent },
  { path: 'list-solutions/:identifier', component: ListSolutionsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'ch-list', component: ChallengeListComponent },
      { path: 'create-ch', component: CreateChallengeComponent },
      {path : 'profile' , component : ProfileComponent},
      { path: '', redirectTo: '/dashboard/ch-list', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: PageNotFoundComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
