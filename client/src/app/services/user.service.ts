import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = 'http://localhost:3000/User';
  constructor(private http: HttpClient) { }

  userLogin(loginFormValue: any) {
    console.log("loginFormValue");
  }

  userSignUp(signUpFormValue: any) {
    console.log("signUpFormValue")
    this.http.post(this.url + '/signup', signUpFormValue)
    .subscribe({
      next: (result) => {
        console.log("no apperant problem");
        console.log(result);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("finished");
      },
    });
  }

  doesEmailExist(email:string): Observable<boolean>{
    return this.http.post(this.url + '/check/mail', { mail: email})
    .pipe(
      delay(2000),
      map((response: any) => {
        return response.answer;
      }),
      catchError((error: HttpErrorResponse) => {
        // if (error.status === 409) {
          return of(true);
        // } else {
        //   console.log("inside new part...");
        //   throw error;
        // }
      })
    );
  }

  doesUserNameExist(userName:string): Observable<boolean>{
    return this.http.post(this.url + '/check/userName', { userName: userName})
    .pipe(
      delay(2000),
      map((response: any) => {
        return response.answer;
      }),
      catchError((error: HttpErrorResponse) => {
        // if (error.status === 409) {
          return of(true);
        // } else {
        //   console.log("inside new part...");
        //   throw error;
        // }
      })
    );
  }

  mailAvailableValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.doesEmailExist(control.value).pipe(
        map(answer => ( answer ? {'emailExists': true} : null))
      );
    }
  }

  userNameAvailableValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.doesUserNameExist(control.value).pipe(
        map(answer => ( answer ? {'userNameExists': true} : null))
      );
    }
  }
}
