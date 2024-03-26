import { Component } from '@angular/core';
import { homePage } from '../../../../assets/info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  homePage=homePage;
}
