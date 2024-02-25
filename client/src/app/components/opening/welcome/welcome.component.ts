import { Component } from '@angular/core';
import { openingPage } from '../../../../assets/info';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  openingPage = openingPage;

  dance(event: MouseEvent){
    const element = event.target as HTMLElement;
    element.classList.add("dance");
  }

  stopDancing(event: AnimationEvent){
    const element = event.target as HTMLElement;
    element.classList.remove("dance");
  }
}
