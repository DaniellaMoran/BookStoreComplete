import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = 'http://localhost:3000/User';
  constructor(private http: HttpClient) { }

  userSignUp(signUpFormValue: any) {
    console.log("inside user Sign Up")
    this.http.post(this.url + '/signup', signUpFormValue)
    .subscribe((data) => {
      // console.log(data);
    });
  }
}
