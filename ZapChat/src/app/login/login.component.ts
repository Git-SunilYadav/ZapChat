import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginDetails } from './loginDetails';
import { AuthenticateUserService } from '../authenticate-user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginDetails: LoginDetails;
phoneNumber: String = '';
password: String = '';
response: String = '';
isValid: Boolean = true;

constructor(private authenticate: AuthenticateUserService, private router: Router, private route: ActivatedRoute, ) {

   }

  ngOnInit() {
  }

  onClickLogin() {
    this.validate();
    this.loginDetails = new LoginDetails();
    this.loginDetails.isValid = false;
    this.loginDetails.phoneNumber = this.phoneNumber;
    this.loginDetails.password = this.password;

    if (this.isValid) {
      if (this.checkLogin(this.phoneNumber, this.password)) {

        setTimeout(() => {
          if (this.loginDetails.isValid) {
          alert('login successful');
          // return this.router.navigate([/<a [routerLink]="[ '/chatPage', ChatPageComponent ]">chat</a>]);
          /// <a [routerLink]="[ '/path']">name</a>
          this.router.navigate(['chatPage', this.phoneNumber]);
        } else {
          alert('Invalid credentials');
        }
     }, 500);
    }

    }
  }
validate() {
    const phoneNumber = document.forms['loginForm']['phoneNumber'].value;
    this.phoneNumber = phoneNumber.replace(/\s/g, '');
    const phoneNumberRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    const phoneNumberResult = phoneNumberRegex.test(phoneNumber);
    if (!phoneNumberResult) {
        alert('The Phone Number is not valid');
        this.isValid = false;
    }
    const password = document.forms['loginForm']['password'].value;
    this.password = password;
    const passwordRegex = /^[a-zA-Z0-9!@#\$%\^&\*]{8,}$/;
    const passwordResult = passwordRegex.test(password);
    if (!passwordResult) {
        alert('The Password is not valid');
        this.isValid = false;
    }
    return this.isValid;
  }

 checkLogin(loginId, password) {
    this.authenticate.loginAuthenticate(loginId, password).subscribe(loginDetails => this.loginDetails = loginDetails);
    return true;
  }


}
