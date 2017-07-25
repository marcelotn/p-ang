import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import {fadeInAnimation} from "../core/route-animation/route.animation";
declare var jQuery: any;
@Component({
   selector: 'ms-chat',
   templateUrl:'./chat-component.html',
   styleUrls: ['./chat-component.scss'],
   encapsulation: ViewEncapsulation.None,
   host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class ChatComponent implements OnInit {
	
  // MESSAGE
  selectedChat: any;
  chats: Object[] = [{
      from: 'Bobby Sullivan',
      photo: 'assets/img/user-11.jpg',
      subject: 'Refferal Module',
    }, {
      from: 'Bryan Morgan',
      photo: 'assets/img/user-2.jpg',
      subject: 'Good Luck',
    }, {
      from: 'Phillip Carroll',
      photo: 'assets/img/user-3.jpg',
      subject: 'Sign In Process',
    }, {
      from: 'Brandon Boyd',
      photo: 'assets/img/user-4.jpg',
      subject: 'New Offers',
    }, {
      from: 'Laura Mason',
      photo: 'assets/img/user-5.jpg',
      subject: 'Thanks Guys!',
    }, {
      from: 'Barbara Chapman',
      photo: 'assets/img/user-6.jpg',
      subject: 'Happy with Service',
    }, {
      from: 'Doris Baker',
      photo: 'assets/img/user-7.jpg',
      subject: 'Best Deals',
    }
  ];

  messages: Object[] = [{
      from: 'them',
      msg: 'Need help in Refferal Module',
      time : '5 min ago'
    }, {
      from: 'me',
      msg: 'What kind of issue you faced?',
      time : '4 min ago'
    },{
      from: 'them',
      msg: 'By refferal invite, my friend not get refferal offer',
      time : '2 min ago'
    }, {
      from: 'them',
      msg: 'and I have not received any notification',
      time : '2 min ago'
    }
  ];
  newMessage: string;
  send() {
    if (this.newMessage) {
      this.messages.push({
        msg: this.newMessage,
        from: 'me',
        time: 'now'
      });
      this.newMessage = '';
    }
    setTimeout(function(){ jQuery('#newid').scrollTop(10000);}, 500);
  }

  clearMessages() {
    this.messages.length = 0;
  }

  constructor(private pageTitleService: PageTitleService) {
    this.selectedChat = this.chats[1];
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Chat");
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  onSelect(chat: Object[]): void {
    this.selectedChat = chat;
  }

	
}



