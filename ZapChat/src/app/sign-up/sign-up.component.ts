import { UserDetails } from './UserDetails';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public ud: UserDetails[];
  firstName: String = '';
  lastName: String = '';
  email: String = '';
  phoneNumber: String = '';
  password: String = '';
  passwordRepeat: String = '';

  ngOnInit() {
  }

  constructor() { }

  // Validation Function
  validation() {
    const firstName = document.forms['sign-up-form']['firstName'].value;
    const firstNameRegex = /^[a-zA-Z0-9]{3,30}$/;
    const firstNameResult = firstNameRegex.test(firstName);
    if (!firstNameResult) {
        alert('The First Name should be an Alpha-Numeric Character and the length of the field should be between 3 and 30 characters');
        return false;
    }
    const lastName = document.forms['sign-up-form']['lastName'].value;
    const lastNameRegex = /^[a-zA-Z0-9]{3,30}$/;
    const lastNameResult = lastNameRegex.test(lastName);
    if (!lastNameResult) {
        alert('The Last Name should be an Alpha-Numeric Character and the length of the field should be between 3 and 30 characters');
        return false;
    }
    const phoneNumber = document.forms['sign-up-form']['phoneNumber'].value;
    const phoneNumberRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    const phoneNumberResult = phoneNumberRegex.test(phoneNumber);
    if (!phoneNumberResult) {
        alert('The Phone Number is not valid');
        return false;
    }
    const emailAddress = document.forms['sign-up-form']['email'].value;
    // tslint:disable-next-line:max-line-length
    const emailAddressRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailAddressResult = emailAddressRegex.test(emailAddress);
    if (!emailAddressResult) {
        alert('The Email Address is not valid');
        return false;
    }

    const password = document.forms['sign-up-form']['password'].value;
    const passwordRegex = /^[a-zA-Z0-9!@#\$%\^&\*]{8,}$/;
    const passwordResult = passwordRegex.test(password);
    if (!passwordResult) {
        alert('The Password is not valid');
        return false;
    }
    const repeatPassword = document.forms['sign-up-form']['passwordRepeat'].value;
    const repeatPasswordResult = repeatPassword === password;
    if (!repeatPasswordResult) {
        alert('The Passwords do not match');
        return false;
    }
    return true;
  }
}
