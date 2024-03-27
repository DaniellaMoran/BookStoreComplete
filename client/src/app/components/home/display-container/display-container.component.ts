import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-display-container',
  templateUrl: './display-container.component.html',
  styleUrl: './display-container.component.scss'
})
export class DisplayContainerComponent {
  @Input() headline: string = 'כותרת סתמית';
  @Input() isWide: boolean = false;
  @Input() isLarge: boolean = false;
  @HostBinding('style.width')
  get width() {
    return this.isWide ? '90vw' : '40vw';
  };
  
  @HostBinding('style.height')
  get height() {
    return this.isLarge ? '20vh' : '18vh';
  }
  // @HostBinding('style.height') @Input() height: string = '30%'; 
}
