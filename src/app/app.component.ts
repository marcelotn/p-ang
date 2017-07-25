import { Component, Optional, ViewEncapsulation } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { MdDialog, MdDialogConfig, MdDialogRef, MdSnackBar } from '@angular/material';

@Component({
  selector: 'gene-app',
  template: `      
      <block-ui>
        <router-outlet></router-outlet>
      </block-ui>
    `,
  encapsulation: ViewEncapsulation.None
})
export class GeneAppComponent {

  constructor(translate: TranslateService) {
    translate.addLangs(['pt', 'en']);
    translate.setDefaultLang('pt');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/pt|en/) ? browserLang : 'pt');
  }
}
