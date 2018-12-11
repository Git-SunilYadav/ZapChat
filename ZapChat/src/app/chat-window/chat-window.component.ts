import { Component, OnInit } from '@angular/core';
import { Chat } from './../chat-window/chat';
import {AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  chats: any[];
  public chat: Chat;
  message:string = '';
  type:string = '';

  constructor(db: AngularFireDatabase,private router: Router, private route: ActivatedRoute) { 
    db.list('/chat/8237292660/contactList/8578693255/chats')
    .valueChanges().subscribe(chat => {
      this.chats = chat;

    });
  }

  ngOnInit() {

   }

  clearText() {
    this.message = '';
    this.type = '';
  }

}
