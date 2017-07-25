import { Component, OnInit, OnDestroy, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { MdTabChangeEvent } from '@angular/material';
import { fadeInAnimation } from "../../../core/route-animation/route.animation";
import { AssetService, IAssetDetails } from "../../asset/asset.service"
import { CustomValidations } from "../../../forms/form-validation/custom.validators";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { Subscription } from "rxjs/Subscription";
import { IFormComponent, IArrayItemErrors, updateValidations } from "app/forms/form-utilities/form.utilities";

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
	selector: 'ms-assetregistration',
	templateUrl: './asset-registration.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./asset-registration.component.scss'],
	providers: [ AssetService ],
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})
export class AssetRegistrationComponent implements OnInit, OnDestroy, IFormComponent {

	private routeSubscription;
	private assetId: number;
	
	public pricingProcessModelIdInitialized: EventEmitter<string> = new EventEmitter<string>();
	public header: string;

	public validityForm: FormGroup;
	public ratingsForm: FormGroup;

	@Output()
	public assetInitialized: EventEmitter<IAssetDetails> = new EventEmitter<IAssetDetails>();

	public areBasicDataFormsValid = false;	
	
	public validityDataSaved = false;
	
	public ratingsControl: FormArray;	
	public validityControl: FormArray;

	public selectedIndex: number = 0;
	public selectedSubIndex: number = 0;

	constructor(private formBuilder: FormBuilder,
		private pageTitleService: PageTitleService,
		private assetService: AssetService,
		private toastrService: ToastrService,
		private activatedRoute: ActivatedRoute) { }

	@BlockUI() blockUI: NgBlockUI;

	public onLinkClick = (event: MdTabChangeEvent) => {
		this.setStep(event.index);
	}

	public nextStep() {
		this.selectedIndex += 1;
	}

	public setStep(index) {
		this.selectedIndex = index;
	}

	public formErrors: { [index: string]: string[] } = {								
		spreadFee: [],
		emissionValue: [],
		emissionDate: [],
		rentabilityEmissionDate: [],
		maturityDate: [],
		pricingProcessModel: []
	}

	public formArrayErrors: { [index: string]: Array<IArrayItemErrors> } = {		
		
		validityGroup: []
	}

	public handleBasicDataSubmission(assetId) {
		this.assetId = assetId;
		this.areBasicDataFormsValid = true;
		this.nextStep();
		this.updatePageTitle();
	}

	public saveValidityData(validityData) {
		this.blockUI.start('Salvando dados de vigência...');
		this.assetService.saveValidityData(validityData)
			.subscribe(
			() => {
				this.toastrService.success("Dados de vigência salvos com sucesso");
				this.validityDataSaved = true;
				this.nextStep();
			},
			(error) => console.log(error),
			() => this.blockUI.stop()
			);
	}

	public handleBasicDataChanged(areBasicDataFormsValid) {
		this.areBasicDataFormsValid = areBasicDataFormsValid;
	}

	public saveAsset(formData) {
		this.blockUI.start('Salvando...');

		setTimeout(() => {
			this.toastrService.success("Ativo salvo com sucesso");
			this.blockUI.stop();
		}, 1500);
	}

	public getForms() {
		return [
			this.validityForm,
			this.ratingsForm];
	}

	public validationMessages = {
		paperCode: {
			required: 'Informe o código do papel',
			maxLength: 'O código do papel pode possuir no máximo 50 caracteres'
		},
		clearingCode: {
			required: 'Informe a câmara custódia',
			maxLength: 'A câmara custódia pode possuir no máximo 50 caracteres'
		},
		negotiationPlatform: {
			required: 'Informe a plataforma de negocição',
			maxLength: 'A plataforma de negocição pode possuir no máximo 100 caracteres'
		},
		clearingFee: {
			required: 'Informe a taxa de custódia',
			isNotANumber: 'A taxa de custódia deve ser um número'
		},
		paperType: {
			required: 'Informe o tipo de papel',
			maxLength: 'O tipo de papel pode possuir no máximo 50 caracteres'
		},
		isin: {
			maxLength: 'O ISIN pode possuir no máximo 50 caracteres'
		},
		issuer: {
			required: 'Informe o emissor',
			maxLength: 'O emissor pode possuir no máximo 50 caracteres'
		},
		pricingProcessModel: {
			required: 'Informe o modelo de precificação',
			autocompleteItemNotSelected: 'Uma opção deve ser escolhida',
			autocompleteNoItemsFound: 'Nenhuma opção foi retornada, utilize outro termo para a busca'
		},		
	}

	public addRating() {
		var ratingFormGroup = new FormGroup({
			ratingId: new FormControl(null, Validators.required),
			ratingDescription: new FormControl(null)
		});
		this.ratingsControl.push(ratingFormGroup);
	}

	public removeRating(ratingControl) {
		var index = this.ratingsControl.controls.indexOf(ratingControl);
		this.ratingsControl.removeAt(index);
	}

	public addValidityItem() {
		var validityFormGroup = this.formBuilder.group({
			pricingProcessModel: [null, Validators.required],
			initialDate: [null, Validators.required],
			finalDate: [null, Validators.required]
		});
		
		this.formArrayErrors['validityGroup'].push({ 
			'pricingProcessModel': [],
			'initialDate': [],
			'finalDate': []
		});

		this.validityControl.push(validityFormGroup);
	}

	public buildValidityForm() {
		this.validityControl = new FormArray([]);
		this.addValidityItem();

		return this.formBuilder.group({
			validityGroup: this.validityControl
		});
	}

	public buildComplementForm() {
		this.ratingsControl = new FormArray([]);
		this.addRating();

		return this.formBuilder.group({
			ratings: this.ratingsControl
		});
	}

	private assignFormValues(assetDetails?: IAssetDetails) {
		this.assetInitialized.emit(assetDetails);
		
		//setTimeout(() => {this.pricingProcessModelIdInitialized.emit(assetDetails.pre), 150});
	}

	private updatePageTitle() {
		this.pageTitleService.setTitle(this.assetId
			? `Edição do ativo ${this.assetId}`
			: "Cadastro de Ativo");
	}

	ngOnInit() {
		this.pageTitleService.title.subscribe((val: string) => {
			this.header = val;
		});

		this.routeSubscription = this.activatedRoute
			.params
			.do(() => this.blockUI.start())
			.flatMap(params => {
				this.validityForm = this.buildValidityForm();
				this.ratingsForm = this.buildComplementForm();

				if (!params['id']) {
					return Observable.of(null);
				}

				this.assetId = params['id'];
				return this.assetService.get(this.assetId);
			})
			.do(() => this.blockUI.stop())
			.subscribe((assetDetails: IAssetDetails) => {
				this.updatePageTitle();

				if (assetDetails) {
					this.assignFormValues(assetDetails);
				}				
				this.validityForm.valueChanges.subscribe(data => {
					updateValidations(this);
				});				
			});
	}

	ngOnDestroy() {
		this.routeSubscription.unsubscribe();
	}
}
