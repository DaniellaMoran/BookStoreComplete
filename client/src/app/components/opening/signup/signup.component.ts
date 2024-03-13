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
  
  signUpForm = this.formBuilder.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    userName: ["", Validators.required],
    mail: ["", Validators.required],
    password: ["", Validators.required],
  })
  // signUpForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   userName: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // })

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
