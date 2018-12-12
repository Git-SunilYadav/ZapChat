import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireMessaging } from '@angular/fire/messaging'
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {take} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
messaging = firebase.messaging()
currentMessage = new BehaviorSubject(null)

  constructor(private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth) {}

  updateToken(token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(user => {
      if (!user) return;

      const data = { [user.uid]: token }
      this.angularFireDB.object('/chat').update(data)
    })
  }
  requestPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log(token)
        this.updateToken(token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });}

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      this.currentMessage.next(payload)
    });
  }
}