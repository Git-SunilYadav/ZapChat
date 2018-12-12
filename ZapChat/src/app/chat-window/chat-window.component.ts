import { Component, OnInit, NgZone, Input, SimpleChanges, OnDestroy  } from '@angular/core';
import { Chat } from './../chat-window/chat';
import {AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticateUserService } from '../authenticate-user.service';
import { text } from '@angular/core/src/render3';
import { FormsModule } from '@angular/forms';

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
  txtMessage:string;

  // tslint:disable-next-line:max-line-length
  constructor(private db: AngularFireDatabase, private zone: NgZone, private router: Router, private route: ActivatedRoute, private authenticate: AuthenticateUserService) {
  }

  ngOnInit() {
   }

   ngOnChanges(changes: SimpleChanges) {
    this.db.list('/chat/' + this.mobileNo + '/contactList/' + this.messageNumber + '/chats')
    .valueChanges().subscribe(chat => {
      this.chats = chat;

    });
    this.resetUnreadCount(this.mobileNo, this.messageNumber);
  }

  clearText() {
    this.message = '';
    this.type = '';
  }

  sendMessage() {
    this.message =this.txtMessage;
    debugger;
    this.type = 'sent';
    if (this.sendingMessage(this.message, this.type, this.mobileNo, this.messageNumber)) {
      this.txtMessage = "";
    } else {
      alert('Message sending failed');
    }

  }

  sendingMessage(message, type, senderNumber, receiverNumber) {
    this.authenticate.messageSent(message, type, senderNumber, receiverNumber).subscribe(chat => this.chat = chat);
    return true;
  }

  ngOnDestroy() {

  }

  // reset unread message count to 0
  resetUnreadCount(mobNumber,contactNumber){
    if(mobNumber != ""  && contactNumber.toString() != ""){
      this.authenticate.resetUnreadCount(mobNumber,contactNumber).subscribe(chat => this.chat = chat);
    }
   
  }
}
