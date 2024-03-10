import { Component, EventEmitter, Output } from '@angular/core';
import { openingPage } from '../../../../assets/info';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  openingPage = openingPage;
  @Output() signUp: EventEmitter<any> = new EventEmitter();

  dance(event: MouseEvent){
    const element = event.target as HTMLElement;
    element.classList.add("dance");

    this.signUp.emit();
  }

  stopDancing(event: AnimationEvent){
    const element = event.target as HTMLElement;
    element.classList.remove("dance");
  }
}
