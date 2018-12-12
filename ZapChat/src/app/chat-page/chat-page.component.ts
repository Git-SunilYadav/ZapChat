import { Component, OnInit, Input,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy{
  public mobileNo: String;
  private sub: any;
  public messageNumber: String = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.mobileNo = params['number']; // (+) converts string 'id' to a number
      console.log(this.mobileNo);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
