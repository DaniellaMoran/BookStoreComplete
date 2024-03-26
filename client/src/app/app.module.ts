import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpeningPageComponent } from './components/opening/opening-page/opening-page.component';
import { SignupComponent } from './components/opening/signup/signup.component';
import { WelcomeComponent } from './components/opening/welcome/welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputDivComponent } from './components/opening/input-div/input-div.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { HeaderComponent } from './components/home/header/header.component';
import { DisplayContainerComponent } from './components/home/display-container/display-container.component';
import { SearchBoxComponent } from './components/home/search-box/search-box.component';

@NgModule({
  declarations: [
    AppComponent,
    OpeningPageComponent,
    SignupComponent,
    WelcomeComponent,
    InputDivComponent,
    HomePageComponent,
    NotFoundComponent,
    HeaderComponent,
    DisplayContainerComponent,
    SearchBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
