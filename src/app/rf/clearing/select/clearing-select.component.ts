import { Observable } from 'rxjs/Rx';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ClearingService, IClearing } from '../clearing.service';
import { AbstractControl } from '@angular/forms';
import * as _ from 'lodash';

@Component({
	selector: 'clearing-select',
	providers: [
		ClearingService
	],
	templateUrl: './clearing-select.component.html'
})

export class ClearingSelectComponent implements OnInit, OnDestroy {    

	@Input()
	public label: string;
	@Input()
	public clearingControl: AbstractControl;
    
    public clearingOptions: IClearing[] = [];
        
    private getSelectOptions() {
		return this.clearingService.getClearings()
			       .subscribe(
                        response => this.clearingOptions = response,
                        error => console.log(error)
                   );
    }

    ngOnInit(): void {
        this.getSelectOptions();
    }

    ngOnDestroy(): void {
        //throw new Error("Method not implemented.");
    }

    constructor(private clearingService: ClearingService) {        
	}    
}