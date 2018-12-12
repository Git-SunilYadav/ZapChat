import { Component } from '@angular/core';
import {NotificationService} from './notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ZapChat';
  constructor(private messagingService: NotificationService) { }

  message;
  ngOnInit() {
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage.subscribe(message => this.message = message);
  }
 
}
