import { Component } from '@angular/core';

@Component({
  selector: 'app-opening-page',
  templateUrl: './opening-page.component.html',
  styleUrl: './opening-page.component.scss'
})
export class OpeningPageComponent {
  showSignUp(){
    document.getElementById('welcome')!.style.transform = 'translateX(-100%)';
    document.getElementById('signup')!.style.transform = 'translateX(0)';
    // signInPage.style.transform = 'translateX(0)';
  }
}
