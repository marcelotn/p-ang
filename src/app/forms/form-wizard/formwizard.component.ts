import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-formwizard',
    templateUrl:'./formwizard-component.html',
    styleUrls: ['./formwizard-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class FormWizardComponent  implements OnInit{

  	selectedIndex: number = 0;

    constructor(private pageTitleService: PageTitleService) {}

    ngOnInit() {
      this.pageTitleService.setTitle("Form Wizard");
    }

  	nextStep() {
    	this.selectedIndex += 1;
  	}

  	previousStep() {
    	this.selectedIndex -= 1;
  	}   
}



