import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
	moduleId: module.id,
	selector: 'snackbar-material',
	templateUrl:'./snackbar-material.html',
	encapsulation: ViewEncapsulation.None,
  host: {
      "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ],
	changeDetection: ChangeDetectionStrategy.Default
})
export class SnackbarOverviewComponent implements OnInit{
  	constructor(public snackBar: MdSnackBar, private pageTitleService: PageTitleService) {}

  	ngOnInit() {
    	this.pageTitleService.setTitle("Snackbar");
   	}

  	openSnackBar() {
    	this.snackBar.open("Showing Snack", "Close");
	}

}


