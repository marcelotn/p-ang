import { Observable } from 'rxjs/Rx';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { InstitutionService, IInstitution } from '../institution.service';
import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import { Subscription } from "rxjs/Subscription";
import { AbstractAutocompleteComponent } from "../../../autocomplete/abstract-autocomplete.component";

@Component({
	selector: 'institution-autocomplete',
	providers: [
		InstitutionService
	],
	templateUrl: './institution-autocomplete.component.html',
	styleUrls: ['../../../autocomplete/autocomplete.component.scss']
})

export class InstitutionAutocompleteComponent extends AbstractAutocompleteComponent<IInstitution> {

	public displayEntityFunction = (item: IInstitution) => {
		if (!item) {
			return "";
		}
		return item.code;
	}

	public isValidSelection(arg: any): arg is IInstitution {
		return arg && arg.id !== undefined && arg.code !== undefined;
	}

	constructor(private institutionService: InstitutionService) {
		super(institutionService);
	}
}