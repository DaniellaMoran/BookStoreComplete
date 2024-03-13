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

  onSignUp(event: MouseEvent){
    const element = event.target as HTMLElement;
    element.classList.add("dance");
    setTimeout(() => {
      this.signUp.emit();
    }, 900);
  }

  stopDancing(event: AnimationEvent){
    const element = event.target as HTMLElement;
    element.classList.remove("dance");
  }
}
