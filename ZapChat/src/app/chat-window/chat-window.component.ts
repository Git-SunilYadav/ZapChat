import { Component, OnInit,NgZone,Input,SimpleChanges } from '@angular/core';
import { Chat } from './../chat-window/chat';
import {AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticateUserService } from '../authenticate-user.service';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})

@Injectable({ providedIn: 'root' })
export class ChatWindowComponent implements OnInit {

  @Input() public mobileNo;
  @Input() public messageNumber;

  private chats: any[] = [];
  public chat: Chat;
  message: String = '';
  type: String = '';
  number:string;

  constructor(private db: AngularFireDatabase,private zone:NgZone,private router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit() {
   
   }

   ngOnChanges(changes: SimpleChanges) {
    this.db.list('/chat/'+this.mobileNo+'/contactList/'+ this.messageNumber +'/chats')
    .valueChanges().subscribe(chat => {
      this.chats = chat;

    });
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
  
  ngOnDestroy() {
  
  }
}
