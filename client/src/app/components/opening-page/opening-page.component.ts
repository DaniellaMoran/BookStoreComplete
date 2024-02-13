import { Component } from '@angular/core';
import { openingPage } from '../../../assets/info';

@Component({
  selector: 'app-opening-page',
  templateUrl: './opening-page.component.html',
  styleUrl: './opening-page.component.scss'
})
export class OpeningPageComponent {
  openingPage = openingPage;
  dsaad(){
    this.openingPage.headline
  }
}
