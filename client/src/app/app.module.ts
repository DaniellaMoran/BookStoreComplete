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

@NgModule({
  declarations: [
    AppComponent,
    OpeningPageComponent,
    SignupComponent,
    WelcomeComponent,
    InputDivComponent
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
