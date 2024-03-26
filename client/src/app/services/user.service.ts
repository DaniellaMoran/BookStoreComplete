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

  userLogin(loginFormValue: any): Observable<any> {
    return new Observable<any>(observer => {
      this.http.post(this.url + '/login', loginFormValue)
        .subscribe({
          next: (result: any) => {
            observer.next({
              token: result.token,
              status: true,
              message: result.message
            });
            observer.complete();
          },
          error: (error) => {
            observer.next({
              status: error.ok,
              message: error.error.message
            });
            observer.complete();
          }
        });
    });
  }

  userSignUp(signUpFormValue: any): Observable<any> {
    return new Observable<any>(observer => {
      this.http.post(this.url + '/signup', signUpFormValue)
      .subscribe({
        next: (result) => {
          console.log(result);
          observer.next(result);
          observer.complete();
        },
        error: (error) => {
          observer.next({
            message: error.error.message
          });
          observer.complete();
        },
        complete: () => {
        },
      });
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
