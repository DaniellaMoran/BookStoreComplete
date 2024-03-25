import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-opening-page',
  templateUrl: './opening-page.component.html',
  styleUrl: './opening-page.component.scss',
  animations: [
    trigger('slideInOut', [
      state('welcome', style({
        transform: 'translateX(0)'
      })),
      state('login, signUp', style({
        transform: 'translateX(-100%)'
      })),
      transition('welcome <=> login, welcome <=> signUp', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class OpeningPageComponent {
  // For controling the *ngIf:
  operationChoice: string = 'welcome';
  
  // For controlling the animation:
  animationTrigger: string = 'welcome';

  showPage(toShow: string){
    this.operationChoice = toShow;
    this.animationTrigger = toShow;
  }

  animateBackToWelcome() {
    // First the animation is triggered when the user clicks go back
    this.animationTrigger = 'welcome';
  }

  goBackToWelcome(event: AnimationEvent) {
    // Check if the animation transition is complete
    if (event.toState === 'welcome' && event.phaseName === 'done') {
      // Set the operationChoice to 'welcome' after the animation transition is complete
      // This now changes the *ngIf state and completes the going back.
      this.operationChoice = 'welcome';
    }
  }
}
