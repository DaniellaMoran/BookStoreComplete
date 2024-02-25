import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/opening/welcome/welcome.component';
import { SignupComponent } from './components/opening/signup/signup.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent, data: {animation: 'isRight'}},
  { path: 'signup', component: SignupComponent, data: {animation: 'isLeft'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
