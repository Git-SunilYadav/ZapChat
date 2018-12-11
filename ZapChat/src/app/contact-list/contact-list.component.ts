import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent  {

  contactList: any[];
  constructor(db: AngularFireDatabase,private router: Router, private route: ActivatedRoute) {
    db.list('/chat/8237292660/contactList/')
    .valueChanges().subscribe(contact => {
      this.contactList = contact;

    });
   }

  ngOnInit() {
  
  }

  showMessages(number){
    alert("InShowMessgae() "+number);
    //this.router.navigate(['chatPage/:8578693255']);
  }

}
