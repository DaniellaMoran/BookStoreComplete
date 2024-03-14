import { Component, EventEmitter, Output } from '@angular/core';
import { signUpPage } from '../../../../assets/info';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpPage = signUpPage;
  @Output() goBackToWelcome: EventEmitter<any> = new EventEmitter();
  showPassword: boolean = false;
  
  signUpForm = this.formBuilder.group({
    firstName: ["", [Validators.required, Validators.pattern(/^[A-Za-z]+$/), Validators.minLength(8)]],
    lastName: ["", [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
    userName: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(13)]],
    mail: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/)]],
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log("sumbited");
    this.userService.userSignUp(this.signUpForm.value);
  }

  goBack(){
    this.goBackToWelcome.emit();
  }
}
