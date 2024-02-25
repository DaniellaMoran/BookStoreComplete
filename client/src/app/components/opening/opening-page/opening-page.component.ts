import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {  fader,  } from "../../../../assets/route-animations";

@Component({
  selector: 'app-opening-page',
  templateUrl: './opening-page.component.html',
  styleUrl: './opening-page.component.scss',
  animations: [
    fader
  ]
})
export class OpeningPageComponent {
  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
