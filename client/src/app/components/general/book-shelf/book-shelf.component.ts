import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrl: './book-shelf.component.scss'
})
export class BookShelfComponent {
  @Input() headline: string = 'כותרת סתמית';
  @Input() isPresent: boolean = false;
  // @Input() isLarge: boolean = false;
  @HostBinding('style.width')
  get width() {
    return this.isPresent ? '40vw' : '90vw';
  };
  
  // @HostBinding('style.height')
  // get height() {
  //   return this.isLarge ? '20vh' : '18vh';
  // }
}
