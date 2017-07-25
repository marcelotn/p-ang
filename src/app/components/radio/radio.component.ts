import { Component, OnInit,ViewEncapsulation }      from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-radio',
  	templateUrl:'./radio-material.html',
  	styleUrls: ['./radio-material.scss'],
     encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class RadioComponent implements OnInit {

	constructor(private pageTitleService: PageTitleService) {}

   	ngOnInit() {
    	this.pageTitleService.setTitle("Radio Buttons");
   	}

	favoriteSeason: string;

	seasons = [
	   'Winter',
	   'Spring',
	   'Summer',
	   'Autumn',
	];
}


