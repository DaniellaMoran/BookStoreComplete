import { Component } from '@angular/core';
import { signUpPage } from '../../../../assets/info';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpPage=signUpPage;
}
