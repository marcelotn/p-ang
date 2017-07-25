import { Observable } from 'rxjs/Rx';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { PricingProcessModelService, IPricingProcessModel } from '../pricing.process.model.service';
import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import { Subscription } from "rxjs/Subscription";
import { AbstractAutocompleteComponent } from "app/autocomplete/abstract-autocomplete.component";

@Component({
	selector: 'pricing-process-model-autocomplete',
	providers: [
		PricingProcessModelService
	],
	templateUrl: './pricing-process-model-autocomplete.component.html',
	styleUrls: ['../../../autocomplete/autocomplete.component.scss']
})

export class PricingProcessModelAutocompleteComponent extends AbstractAutocompleteComponent<IPricingProcessModel> {
	constructor(private pricingProcessModelService: PricingProcessModelService) {
		super(pricingProcessModelService);
	}

	public displayEntityFunction = (pricingProcessModel: IPricingProcessModel): string => {
		if (!pricingProcessModel || !pricingProcessModel.code) {
			return "";
		}
		return pricingProcessModel.code;
	}
	
	public isValidSelection(arg: any): arg is IPricingProcessModel {
		return arg && arg.id !== undefined && arg.code !== undefined;
	}
}