import { AddContactsComponent } from './../add-contacts/add-contacts.component';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  mobileNo: String;
  private sub: any;
  addContactWasClicked = false;
  constructor(private route: ActivatedRoute ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.mobileNo = params['number']; // (+) converts string 'id' to a number
      console.log(this.mobileNo);
    });
  }
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
