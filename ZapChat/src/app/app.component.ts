import { Component,OnInit  } from '@angular/core';
import { MessagingService } from "./messaging.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  message;
  constructor(private msgService: MessagingService) {}
  ngOnInit() {
    this.msgService.getPermission()
    this.msgService.receiveMessage()
    this.message = this.msgService.currentMessage
  }

  title = 'ZapChat';
  constructor(private messagingService: NotificationService) { }

  message;
  ngOnInit() {
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage.subscribe(message => this.message = message);
  }
 
}
