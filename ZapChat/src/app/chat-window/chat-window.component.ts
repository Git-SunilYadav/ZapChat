import { Component, OnInit } from '@angular/core';
import { Chat } from './../chat-window/chat';
import { ChatServices } from './chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  chats: Chat[] = [];
  public chat: Chat;
  message = '';
  type = '';
  isType = false;

  constructor() { }

  ngOnInit() {
    this.addChat('Hi This is Sunil Yadav', 'received', false);
   this.addChat('Hi This is Kiran Panchal', 'sent', true);
   this.addChat('Hi This is Rushabh', 'received', false);
   this.addChat('Hi this is Patekar', 'sent', true);
   }

  clearText() {
    this.message = '';
    this.type = '';
    this.isType = false;
  }

  checkType(ch): void {
    if ( ch.type === 'sent') {
      this.isType = true;
    }
  }

  addChat(message, type, isType): void {
    this.chat = new Chat();
    this.chat.message = message;
    this.chat.type = type;
    this.chat.isType = isType;
    this.chats.push(this.chat);
    this.clearText();
  }

}
