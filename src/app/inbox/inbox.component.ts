import {
  Component, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef,
  Renderer, AfterViewChecked
} from '@angular/core';
import {Mail} from "./mail.model";
import {MailService} from "./mail.service";
import {MdDialog, MdSnackBar} from "@angular/material";
import {InboxComposeComponent} from "./inbox-compose/inbox-compose.component";
import { PageTitleService } from '../core/page-title/page-title.service';
import {fadeInAnimation} from "../core/route-animation/route.animation";

@Component({
  selector: 'ms-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class InboxComponent implements OnInit, OnDestroy, AfterViewChecked {

  shownMails: Mail[] = [ ];
  shownMailDetail: boolean;
  checked = false;

  selectedMails: Mail[] = [ ];
  selectedMail: Mail;

  respondActive: boolean;
  clickListeners: Function[] = [ ];

  @ViewChildren('mailList')
  mailList: QueryList<ElementRef>;

  constructor(
    private mailService: MailService,
    private renderer: Renderer,
    public composeDialog: MdDialog,
    private snackBar: MdSnackBar,
    private pageTitleService: PageTitleService
  ) { }

  ngOnInit() {
    this.getMessages();
    this.pageTitleService.setTitle("Inbox");
  }

ngAfterViewChecked() {
    this.createMailListClickListeners();
  }

  getMessages(): void {
    this.mailService.getMessages().then(shownMails => this.shownMails = shownMails);
  }
  createMailListClickListeners() {
    this.clickListeners.forEach((listener) => {
      listener();
    });

    this.mailList.forEach((elem, index) => {
      this.clickListeners.push(
        this.renderer.listen(elem.nativeElement, 'click', (event) => {
          if (event.target.className != 'md-checkbox-inner-container' && event.target.className != 'md-ripple-background') {
            this.showMailDetail();
          }
        })
      );
    });
  }

  openComposeDialog() {
    let dialogRef = this.composeDialog.open(InboxComposeComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open(result);
      }
    });
  }



  resetTemporaries() {
    this.shownMailDetail = null;
    this.respondActive = false;
  }

  showMailDetail() {
    this.shownMailDetail = true;
  }


  isSelected(mail: Mail) {
    this.selectedMail = mail;
  }


  ngOnDestroy() {
    this.clickListeners.forEach((listener) => {
        listener();
      })
  }
}
