import { Component, OnInit, OnDestroy, ViewEncapsulation, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators as ThirdPartyCustomValidators } from 'ng2-validation';
import { MdTabChangeEvent } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../../core/route-animation/route.animation";
import { CustomValidations } from "../../../forms/form-validation/custom.validators";
import { FormMasks } from '../../../forms/form-utilities/form.masks';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { InstitutionService, IInstitutionDetails } from '../institution.service';
import * as _ from 'lodash';
import { IFormComponent, IArrayItemErrors, updateValidations } from "app/forms/form-utilities/form.utilities";

@Component({
	selector: 'ms-institutionregistration',
	encapsulation: ViewEncapsulation.None,
	providers: [
		InstitutionService
	],
	templateUrl: './institution-registration.component.html',
	styleUrls: ['./institution-registration.component.scss'],
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class InstitutionRegistrationComponent implements OnInit, OnDestroy, IFormComponent {
	
	public form1: FormGroup;
	public form2: FormGroup;
	
	public cnpjMask = FormMasks.cnpjMask;
	public brPhoneMask = FormMasks.brPhoneMaskFunction;
	public selectedIndex: number = 0;
	public header: string;
	public economicActivityIdInitialized: EventEmitter<number> = new EventEmitter<number>();
	public pendingEconomicActivitiesRequests: number = 0;	
	private institutionId: string;
	private routeSubscription;	

	@BlockUI() blockUI: NgBlockUI;

	constructor(private fb: FormBuilder,
		private pageTitleService: PageTitleService,
		private activatedRoute: ActivatedRoute,
		private institutionService: InstitutionService) { }

	public formErrors: { [index: string]: string[] } = {
		personCode: [],
		socialName: [],
		contactPhoneNumber: [],
		mnemonicCode: [],
		institutionName: [],
		shortInstitutionName: [],
		institutionCode: [],
		institutionCnpj: [],
		economicNatureDescription: [],
	}

	public formArrayErrors: { [index: string]: Array<IArrayItemErrors> } = {};
	
	public getForms() {
		return [this.form1, this.form2];
	}

	public validationMessages: { [index: string]: { [property: string]: string } } = {
		personCode: {
			'required': 'Informe o código da pessoa.'
		},
		socialName: {
			'required': 'Informe a razão social.'
		},
		contactPhoneNumber: {
			'required': 'Informe o telefone de contato.',
			'phone': 'Informe um telefone válido: +__ (__) ____-____'
		},
		mnemonicCode: {
			'required': 'Informe o código mnemônico.'
		},
		institutionName: {
			'required': 'Informe o nome da instituição.'
		},
		shortInstitutionName: {
			'required': 'Informe o nome resumido da instituição.'
		},
		institutionCode: {
			'required': 'Informe o código de instituição.'
		},
		institutionCnpj: {
			'required': 'Informe o CNPJ da instituição.',
			'invalidCnpj': 'Informe um CNPJ válido'
		},
		economicNatureDescription: {
			'required': 'Informe a descrição da natureza econômica.'
		},
	}

	public onLinkClick = (event: MdTabChangeEvent) => {
		this.setStep(event.index);
	};

	public nextStep() {
		this.selectedIndex += 1;
	}

	public setStep(index) {
		this.selectedIndex = index;
	}

	private buildForm1Group() {
		return this.fb.group({
			personCode: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
			socialName: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],			
			institutionName: [null, Validators.compose([Validators.required])],
			shortInstitutionName: [null, Validators.compose([Validators.required])],
			institutionCode: [null, Validators.compose([Validators.required])],
			institutionCnpj: [null, Validators.compose([Validators.required, CustomValidations.isValidCNPJ])],
			economicActivity: [null, Validators.compose([Validators.required])],
		});
	}
	private buildForm2Group() {
		return this.fb.group({
			contactPhoneNumber: [null, Validators.compose([Validators.required, ThirdPartyCustomValidators.phone('BR')])],
			mnemonicCode: [null, Validators.compose([Validators.required])]
		});
	}

	private assignFormValues(institutionDetails?: IInstitutionDetails) {
		this.form1.controls['personCode'].setValue(institutionDetails.code);
		this.form1.controls['socialName'].setValue(institutionDetails.socialName);		
		this.form1.controls['institutionName'].setValue(institutionDetails.institutionName);
		this.form1.controls['shortInstitutionName'].setValue(institutionDetails.shortInstitutionName);
		this.form1.controls['institutionCode'].setValue(institutionDetails.institutionCode);
		this.form1.controls['institutionCnpj'].setValue(institutionDetails.institutionCnpj);
		setTimeout(() => {
			this.economicActivityIdInitialized.emit(institutionDetails.economicNatureId);
		}, 200);

		this.form2.controls['contactPhoneNumber'].setValue(institutionDetails.contactPhoneNumber);
		this.form2.controls['mnemonicCode'].setValue(institutionDetails.mnemonicCode);
	}

	ngOnInit() {
		this.pageTitleService.title.subscribe((val: string) => {
			this.header = val;
		});

		this.routeSubscription = this.activatedRoute
			.params
			.do(() => this.blockUI.start())
			.flatMap(params => {
				this.form1 = this.buildForm1Group();
				this.form2 = this.buildForm2Group();
				if (!params['id']) {
					return Observable.of(null);
				}

				this.institutionId = params['id'];
				return this.institutionService.get(this.institutionId);
			})
			.do(() => this.blockUI.stop())
			.subscribe((institutionDetails: IInstitutionDetails) => {
				this.pageTitleService.setTitle(this.institutionId
					? `Edição da instituição ${this.institutionId}`
					: "Cadastro da instituição");

				if (institutionDetails) {
					this.assignFormValues(institutionDetails);
				}

				this.form1.valueChanges.subscribe(data => updateValidations(this));
				this.form2.valueChanges.subscribe(data => updateValidations(this));
			});
	}

	ngOnDestroy() {
		this.routeSubscription.unsubscribe();
	}

}
