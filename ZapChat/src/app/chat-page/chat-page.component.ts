import { ContactListComponent } from './../contact-list/contact-list.component';
import { AddContactsComponent } from './../add-contacts/add-contacts.component';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import {AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  mobileNo: String;
  private sub: any;
  addContactWasClicked = false;
  contactList: any[];

  constructor(db: AngularFireDatabase, private route: ActivatedRoute ) {
    db.list('/chat/8237292660/contactList/')
    .valueChanges().subscribe(contact => {
      this.contactList = contact;
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.mobileNo = params['number'];
      console.log(this.mobileNo);
    });
  }
  // functions to toggle between add contacts and contact list
  setAddContacts(clicked: boolean) {
      this.addContactWasClicked = clicked;
    }
  setContactList(clicked: boolean) {
    this.addContactWasClicked = !clicked;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
