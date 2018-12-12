import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ActivatedRoute} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthenticateUserService } from './authenticate-user.service';
import { TermsComponent } from './terms/terms.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import {AngularFireModule } from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { AddContactsComponent } from './add-contacts/add-contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    TermsComponent,
    ContactListComponent,
    AddContactsComponent,
    ChatPageComponent,
    ChatWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {
        path: 'contactList',
        component: ContactListComponent
      },
      {
        path: 'addContacts',
        component: AddContactsComponent
      },
      {
        path: 'chatPage/:number',
        component: ChatPageComponent
      },
       {
        path: 'chatWindow',
        component: ChatWindowComponent
      },
      {
        path: 'terms',
        component: TermsComponent
      },
      {
        path: 'signUp',
        component: SignUpComponent
      },
      {
        path: '',
        component: LoginComponent
      },
  ])
  ],
  providers: [
    AuthenticateUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
