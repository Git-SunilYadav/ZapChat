import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ActivatedRoute} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthenticateUserService } from './authenticate-user.service';
import { TermsComponent } from './terms/terms.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatPageComponent } from './chat-page/chat-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    TermsComponent,
    ChatPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'terms',
        component: TermsComponent
      },
      {
        path: 'signUp',
        component: SignUpComponent
      },
      {
        path: 'chatPage',
        component: ChatPageComponent
      },
      {
      path: '',
      component: LoginComponent
      }
  ])
  ],
  providers: [
    AuthenticateUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
