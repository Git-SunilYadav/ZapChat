import { Component, OnInit } from '@angular/core';
import { AddContact } from './addContact';
import {AddContactService} from '../add-contact.service';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.scss']
})
export class AddContactsComponent implements OnInit {
  addContact: AddContact;
  phoneNumber: String = '';
  name: String = '';
  constructor( private add: AddContactService) { }

  ngOnInit() {
  }
  onClickAdd() {
    this.validate();
    this.addContact = new AddContact();
    this.addContact.phoneNumber = this.phoneNumber;
    this.addContact.name = this.name;
  }
  validate() {
    // validation function for adding contact
    const phoneNumber = document.forms['addContact']['phoneNumber'].value;
    if (phoneNumber === '') {
      alert('please enter Phone Number');
    }
    const name = document.forms['addContact']['name'].value;
    if (name === '') {
      alert('please enter Contact Name');
    }
}
}
