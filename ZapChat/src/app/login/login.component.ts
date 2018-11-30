import { Component, OnInit } from '@angular/core';
import { loginDetails } from './loginDetails';
import { AuthenticateUserService } from '../authenticate-user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
public loginDetails : loginDetails;
phoneNumber: String = '';
password: String = '';
response: String = '';
isValid: Boolean = true;

constructor(private authenticate : AuthenticateUserService) {

   }

  ngOnInit() {
  }

  onClickLogin(){
    this.validate();
    this.loginDetails = new loginDetails();
    this.loginDetails.isValid = false;
    this.loginDetails.phoneNumber = this.phoneNumber;
    this.loginDetails.password = this.password;

    if(this.isValid){
      this.checkLogin(this.phoneNumber, this.password);
    }
      }
    
  

validate() {
    const phoneNumber = document.forms['loginForm']['phoneNumber'].value;
    const phoneNumberRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    const phoneNumberResult = phoneNumberRegex.test(phoneNumber);
    if (!phoneNumberResult) {
        alert('The Phone Number is not valid');
        this.isValid = false;
    }
    const password = document.forms['loginForm']['password'].value;
    const passwordRegex = /^[a-zA-Z0-9!@#\$%\^&\*]{8,}$/;
    const passwordResult = passwordRegex.test(password);
    if (!passwordResult) {
        alert('The Password is not valid');
        this.isValid = false;
    }
    return this.isValid;
    
  }
 checkLogin(loginId, password) {
  this.authenticate.loginAuthenticate(loginId,password).subscribe(loginDetails => this.loginDetails = loginDetails);
  if(this.loginDetails.isValid){
    alert("Login successful");
  }
  else{
    alert("Invalid Credentials");
  }
 }
}
