import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-display-container',
  templateUrl: './display-container.component.html',
  styleUrl: './display-container.component.scss'
})
export class DisplayContainerComponent {
  @Input() headline: string = 'כותרת סתמית';
  @Input() isLarge: boolean = false;
  @HostBinding('style.width')
  get width() {
    return this.isLarge ? '90%' : '45%';
  }
  // @HostBinding('style.height') @Input() height: string = '30%'; 
}
