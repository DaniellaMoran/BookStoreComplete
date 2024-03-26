import { Component } from '@angular/core';
import { homePage } from '../../../../assets/info';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  homePage=homePage;
}
