import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { signUpPage } from '../../../../assets/info';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signUpPage = signUpPage;
  @Input() operation: string = 'signup';
  @Output() goBackToWelcome: EventEmitter<any> = new EventEmitter();
  showPassword: boolean = false;
  loggedIn: boolean | undefined = undefined;

  signUpForm!: FormGroup;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(){
    if (this.operation === 'login') {
      this.buildLoginForm();      
    } else {
      this.buildSignUpForm();      
    }
  }

  buildSignUpForm(){
    this.signUpForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ["", [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      userName: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(13)], [this.userService.userNameAvailableValidator()]],
      mail: ["", [Validators.required, Validators.email], [this.userService.mailAvailableValidator()]],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/)]],
    });
  }

  buildLoginForm(){
    this.loginForm = this.formBuilder.group({
      userNameOrMail: ["", [this.userNameOrMailValidator, Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  userNameOrMailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null; // If empty, don't show error
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (emailRegex.test(value) || usernameRegex.test(value)) {
      return null; // Valid
    } else {
      return { invalidUsernameOrMail: true }; // Invalid
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log("sumbited");
    if (this.operation === 'login') {
      
      this.userService.userLogin(this.loginForm.value).subscribe({
        next: (response) => {
          // This changes the error message to show up
          this.loggedIn = response.status;

          if (response.status) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          console.log('Error:', error);
        },
        complete: () => {
          console.log('Login process completed');
        }
      });
    } else {
      this.userService.userSignUp(this.signUpForm.value).subscribe({
        next: (response) => {
          
        },
        error: (error) => {
          console.log('Error:', error);
        },
        complete: () => {
          console.log('Signup process completed');
        }
      });
    }
  }

  goBack(){
    this.goBackToWelcome.emit();
  }
}
