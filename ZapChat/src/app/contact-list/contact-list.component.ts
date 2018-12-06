import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent  {

  contactList: any[];
  constructor(db: AngularFireDatabase) {
    db.list('/chat/8237292660/contactList/')
    .valueChanges().subscribe(contact => {
      this.contactList = contact;
      console.log(this.contactList);

    });
   }

  ngOnInit() {
  
  }

}
