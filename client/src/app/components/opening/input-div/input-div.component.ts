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
  @Input() showPassword: boolean = true;
  signUpPage = signUpPage;

  errors = {
    required: "This is a MUST.",
    email: "That look like an email to you?",
    minlength: "Too short",
    maxlength: "TOO long.",
    isAlpha: "No numbers here",
    password: "One upper, one lower, one digit.",
    userNameExists: "user name exists bitch",
    emailExists: "email already takennn"
  }
}
