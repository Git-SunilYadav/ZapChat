import { Component, OnInit } from '@angular/core';
import { loginDetails } from './loginDetails';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
public ld : loginDetails[];
phoneNumber: String = '';
password: String = '';
  constructor() { }

  ngOnInit() {
  }
validate() {
    const phoneNumber = document.forms['loginForm']['phoneNumber'].value;
    const phoneNumberRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    const phoneNumberResult = phoneNumberRegex.test(phoneNumber);
    if (!phoneNumberResult) {
        alert('The Phone Number is not valid');
        return false;
    }
    const password = document.forms['loginForm']['password'].value;
    const passwordRegex = /^[a-zA-Z0-9!@#\$%\^&\*]{8,}$/;
    const passwordResult = passwordRegex.test(password);
    if (!passwordResult) {
        alert('The Password is not valid');
        return false;
    }
    return true;
  }
}
