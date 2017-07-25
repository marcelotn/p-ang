import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-progress',
  	templateUrl:'./progress-material.html',
  	styleUrls: ['./progress-material.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class ProgressComponent implements OnInit{

    constructor(private pageTitleService: PageTitleService) {}

    ngOnInit() {
      this.pageTitleService.setTitle("Progress");
    }

  	value = 40;
  	determinateValue = 30;
  	bufferValue = 30;
  	bufferBufferValue = 40;

  	step(val: number) {
	 	this.value += val;
  	}

  	stepDeterminateVal(val: number) {
	 	this.determinateValue += val;
  	}

  	stepBufferVal(val: number) {
	 	this.bufferValue += val;
  	}

  	stepBufferBufferVal(val: number) {
	 	this.bufferBufferValue += val;
  	}

}


