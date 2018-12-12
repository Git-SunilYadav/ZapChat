import { Component, OnInit,NgZone,Input,SimpleChanges } from '@angular/core';
import { Chat } from './../chat-window/chat';
import {AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

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
  message:string = '';
  type:string = '';
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
  
  ngOnDestroy() {
  
  }
}
