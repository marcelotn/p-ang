import { Injectable } from '@angular/core';
import {Mail} from "./mail.model";
import {demoMails} from "./mails.demo";

@Injectable()
export class MailService {

  getMessages(): Promise<Mail[]> {
    return Promise.resolve(demoMails);
  }
}
