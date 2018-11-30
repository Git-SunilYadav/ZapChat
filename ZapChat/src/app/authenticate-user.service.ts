import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDetails } from './login/loginDetails';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticateUserService {
public loginDetails: LoginDetails;
  constructor(private http: HttpClient) {

   }
   loginAuthenticate (loginId, password): Observable<LoginDetails> {
    this.loginDetails = new LoginDetails();
    this.loginDetails.phoneNumber = loginId;
    this.loginDetails.password = password;

    return this.http.post<LoginDetails>('http://localhost:3000/user', this.loginDetails)
    .pipe();
   }
}
