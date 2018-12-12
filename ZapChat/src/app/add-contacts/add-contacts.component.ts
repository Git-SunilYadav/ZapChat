import { Component, OnInit } from '@angular/core';
import { AddContact } from './addContact';
import {AddContactService} from '../add-contact.service';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.scss']
})
export class AddContactsComponent implements OnInit {
  addContact: AddContact;
  phoneNumber: String = '';
  name: String = '';
  isValid: boolean = false;
  contactNumber: String = '';
  constructor( private add: AddContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  onClickAdd() {
    this.addContact = new AddContact();
    this.validate();
    // this.addContact.phoneNumber = this.phoneNumber;
    // this.addContact.firstName = this.name;
    // this.addContact.newContact = this.contactNumber;

      if (this.validate() && this.checkAddContact(this.addContact.newContact, this.addContact.firstName, this.addContact.phoneNumber)) {
        setTimeout(() => {
          if (this.addContact) {
          alert('added Contact successfully');        
        } else {
          alert('Invalid credentials');
          }
        }, 500);
      }
    }

  validate() {
    // validation function for adding contact
    let newContact = document.forms['addContact']['newContact'].value;
    let name = document.forms['addContact']['name'].value;

    if (newContact === '') {
      alert('please enter Phone Number');
      return false;
    } else {
      this.addContact.newContact = newContact;
    }

    if (name === '') {
      alert('please enter Contact Name');
      return false;
    } else {
      this.addContact.firstName = name;
      this.addContact.phoneNumber = '8237292660';
    }

    return true;
}
checkAddContact(contactNumber, name, phoneNumber) {
  this.add.addContactAuthenticate(contactNumber, name, phoneNumber).subscribe(addContact => this.addContact = addContact);
  return true;
}
}
