import { Component, OnInit, AfterContentInit } from '@angular/core';
import {AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contactList: any[];
  constructor(db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    db.list('/chat/8237292660/contactList/')
    .valueChanges().subscribe(contact => {
      this.contactList = contact;
    });
   }

  ngOnInit() {
  }
// Show messages for the number
  showMessages(number) {
    alert('InShowMessage() ' + number);
    // this.router.navigate(['chatPage/:8578693255']);
  }


}
