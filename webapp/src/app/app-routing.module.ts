import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeDescComponent } from './challenge-desc/challenge-desc.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'ch-desc', component:ChallengeDescComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'ch-list',component:ChallengeListComponent},
  {path:'', redirectTo:'/ch-desc', pathMatch:'full'},
  {path:'', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
