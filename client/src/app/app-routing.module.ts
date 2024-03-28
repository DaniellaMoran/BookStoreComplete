import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningPageComponent } from './components/opening/opening-page/opening-page.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';

const routes: Routes = [
  { path: 'home', component: OpeningPageComponent},
  { path: '', component: HomePageComponent},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
