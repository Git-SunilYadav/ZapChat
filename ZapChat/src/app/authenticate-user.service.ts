import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginDetails } from './login/loginDetails';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticateUserService {
public loginDetails :loginDetails; 
  constructor(private http: HttpClient) {

   }
   loginAuthenticate (loginId,password) : Observable<loginDetails>{
    this.loginDetails = new loginDetails();
    this.loginDetails.phoneNumber = loginId;
    this.loginDetails.password = password;

    return this.http.post<loginDetails>("https://api.myjson.com/bins/83vd2",this.loginDetails)
    .pipe();
   } 
}
