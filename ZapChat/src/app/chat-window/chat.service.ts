
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Chat } from './../chat-window/chat';

@Injectable({ providedIn: 'root' })
export class ChatServices {

    constructor(private http: HttpClient) {
         this.getChat().subscribe(data => console.log(data), error => console.log(error));
    }

    public getChat (): Observable<Chat[]> {
         return this.http.get<Chat[]>('C:/Sem4/WebDesign/pretext.json')
         .pipe();
     }
}
