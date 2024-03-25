import { Component } from '@angular/core';

@Component({
  selector: 'app-opening-page',
  templateUrl: './opening-page.component.html',
  styleUrl: './opening-page.component.scss'
})
export class OpeningPageComponent {
  operationChoice: string = '';

  showPage(toShow: string){
    this.operationChoice = toShow;
    console.log(`show Page on opening page::: ${this.operationChoice}`);
    document.getElementById('welcome')!.style.transform = 'translateX(-100%)';
  }

  goBackToWelcome(){
    this.operationChoice = '';
    document.getElementById('welcome')!.style.transform = 'translateX(0)';
  }
}
