import { Component, OnInit,ViewEncapsulation }      from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-select',
  	templateUrl:'./select-material.html',
  	styleUrls: ['./select-material.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class SelectComponent implements OnInit{

	constructor(private pageTitleService: PageTitleService) { }

  	ngOnInit() {
    	this.pageTitleService.setTitle("Select");
   	}

	selectedValue: string;

	foods = [
	   {value: 'steak-0', viewValue: 'Steak'},
	   {value: 'pizza-1', viewValue: 'Pizza'},
	   {value: 'tacos-2', viewValue: 'Tacos'}
	];
}


