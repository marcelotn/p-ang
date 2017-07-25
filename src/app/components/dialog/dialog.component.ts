import { Component, OnInit,ViewEncapsulation }      from '@angular/core';
import { MdDialogRef, MdDialog } from "@angular/material";
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
	selector: 'ms-dialogs',
	templateUrl:'./dialog-material.html',
	styleUrls: ['./dialog-material.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
      "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class DialogOverviewComponent implements OnInit{

  	constructor(public dialog: MdDialog, private pageTitleService: PageTitleService) { }

  	ngOnInit() {
    	this.pageTitleService.setTitle("Dialog");
   	}

dialogRef: MdDialogRef<DemoDialog>;
	result: string;

  	dialogHTML: string = `
  	<button md-raised-button type="button" (click)="openDialog()" color="primary">Open Dialog</button>
  	<p *ngIf="result">You chose: {{ result }}</p>`;

  	openDialog() {
	 	this.dialogRef = this.dialog.open(DemoDialog, {
			disableClose: false
	 	});

		this.dialogRef.afterClosed().subscribe(result => {
			this.result = result;
			this.dialogRef = null;
		});
  	}
}

@Component({
  	selector: 'ms-demo-dialog',
  	template: `
  	<h1>Would you like to order pizza?</h1>

  	<md-dialog-actions align="end">
	 	<button md-button (click)="dialogRef.close('No!')">No</button>
	 	<button md-button color="primary" (click)="dialogRef.close('Yes!')">Yes</button>
  	</md-dialog-actions>
  `
})
export class DemoDialog {
  	constructor(public dialogRef: MdDialogRef<DemoDialog>) { }
}



