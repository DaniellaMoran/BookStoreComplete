import { Component, EventEmitter, Output } from '@angular/core';
import { openingPage } from '../../../../assets/info';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  openingPage = openingPage;
  @Output() operation: EventEmitter<string> = new EventEmitter();

  onChoose(event: MouseEvent, choice: string){
    const element = event.target as HTMLElement;
    element.classList.add("dance");
    setTimeout(() => {
      this.operation.emit(choice);
    }, 900);
  }

  stopDancing(event: AnimationEvent){
    const element = event.target as HTMLElement;
    element.classList.remove("dance");
  }
}
