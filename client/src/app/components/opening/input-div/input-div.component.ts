import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { signUpPage } from '../../../../assets/info';

@Component({
  selector: 'app-input-div',
  templateUrl: './input-div.component.html',
  styleUrl: './input-div.component.scss'
})
export class InputDivComponent {
  @Input() signUpForm!: FormGroup;
  @Input() FormControl!: string;
  signUpPage = signUpPage;
}
