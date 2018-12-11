import { Component, OnInit } from '@angular/core';
import { Chat } from './../chat-window/chat';
import {AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateUserService } from '../authenticate-user.service';
import { text } from '@angular/core/src/render3';


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

  constructor(db: AngularFireDatabase,private router: Router, private route: ActivatedRoute,private authenticate: AuthenticateUserService) { 
    db.list('/chat/8578693255/contactList/8578692727/chats')
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

  sendMessage(){
    this.message = document.getElementsByTagName("input")[0].value;
    this.type='sent';
    if(this.sendingMessage(this.message, this.type)) {
      this.clearText();
      document.getElementsByTagName("input")[0].value='';
    }
    else {
      alert('Message sending failed');
    }
   
  }

  sendingMessage(message, type) {
    this.authenticate.messageSent(message, type).subscribe(chat => this.chat = chat);
    return true;
  }

}
