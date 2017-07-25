import { Observable } from 'rxjs/Rx';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AssetService, IAssetType } from '../../asset/asset.service';
import { AbstractControl } from '@angular/forms';
import * as _ from 'lodash';

@Component({
	selector: 'asset-type-select',
	providers: [
		AssetService
	],
	templateUrl: './asset-type-select.component.html'
})

export class AssetTypeSelectComponent implements OnInit, OnDestroy {    

	@Input()
	public label: string;
	@Input()
	public assetTypeControl: AbstractControl;
    
    public assetTypeOptions: IAssetType[] = [];
        
    private getSelectOptions() {
		return this.assetService.getAssetTypeOptions()
			       .subscribe(
                        response => this.assetTypeOptions = response,
                        error => console.log(error)
                   );
    }

    ngOnInit(): void {
        this.getSelectOptions();
    }

    ngOnDestroy(): void {
        //throw new Error("Method not implemented.");
    }

    constructor(private assetService: AssetService) {        
	}    
}