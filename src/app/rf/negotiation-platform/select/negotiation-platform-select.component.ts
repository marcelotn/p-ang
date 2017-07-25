import { Observable } from 'rxjs/Rx';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { INegotiationPlatform, NegotiationPlatformService } from "app/rf/negotiation-platform/negotiation.platform.service";

@Component({
	selector: 'negotiation-platform-select',
	providers: [
		NegotiationPlatformService
	],
	templateUrl: './negotiation-platform-select.component.html'
})

export class NegotiationPlatformSelectComponent implements OnInit, OnDestroy {    

	@Input()
	public label: string;
	@Input()
	public control: AbstractControl;
    
    public options: INegotiationPlatform[] = [];
        
    private getSelectOptions() {

		return this.negotiationPlatformService.getNegotiationPlatforms()
			       .subscribe(
                        response => this.options = response,
                        error => console.log(error)
                   );
    }

    ngOnInit(): void {
        this.getSelectOptions();
    }

    ngOnDestroy(): void {
        //throw new Error("Method not implemented.");
    }

    constructor(private negotiationPlatformService: NegotiationPlatformService) {        
	}    
}