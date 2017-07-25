import { Component, OnInit,ViewEncapsulation }      from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-checkbox',
  	templateUrl:'./checkbox-material.html',
  	styleUrls: ['./checkbox-material.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class CheckboxComponent implements OnInit {

	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
    	this.pageTitleService.setTitle("Checkbox");
   	}

	checked = false;
  	indeterminate = false;
  	align = 'start';
  	disabled = false;
}


