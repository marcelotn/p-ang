import { Observable } from 'rxjs/Rx';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { EconomicActivityService, IEconomicActivity } from '../../economic-activity/economic.activity.service';
import { fadeInAnimation } from "../../../core/route-animation/route.animation";
import { AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { Subscription } from "rxjs/Subscription";
import { AbstractAutocompleteComponent } from "app/autocomplete/abstract-autocomplete.component";

@Component({
	selector: 'economic-activity-autocomplete',
	providers: [
		EconomicActivityService
	],
	templateUrl: './economic-activity-autocomplete.component.html',
	styleUrls: ['../../../autocomplete/autocomplete.component.scss'],
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class EconomicActivityAutocompleteComponent extends AbstractAutocompleteComponent<IEconomicActivity>{

	public displayEntityFunction = (item: IEconomicActivity) => {
		if (!item) {
			return "";
		}

		return item.description;
	};

	public isValidSelection(arg: any): arg is IEconomicActivity {
		return arg && arg.id !== undefined && arg.description !== undefined;
	}

	constructor(private economicActivityService: EconomicActivityService) {
		super(economicActivityService);
	}

}