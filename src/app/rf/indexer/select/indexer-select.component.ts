import { Observable } from 'rxjs/Rx';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { IndexerService, IIndexer } from "app/rf/indexer/indexer.service";

@Component({
	selector: 'indexer-select',
	providers: [
		IndexerService
	],
	templateUrl: './indexer-select.component.html'
})

export class IndexerSelectComponent implements OnInit, OnDestroy {    

	@Input()
	public label: string;
	@Input()
	public control: AbstractControl;
    
    public options: IIndexer[] = [];
        
    private getSelectOptions() {

		return this.indexerService.getIndexers()
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

    constructor(private indexerService: IndexerService) {        
	}    
}