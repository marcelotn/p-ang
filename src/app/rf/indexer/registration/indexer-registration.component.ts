import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs/Rx';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../../core/route-animation/route.animation";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CustomValidations } from "../../../forms/form-validation/custom.validators";
import { IFormComponent, IArrayItemErrors, updateValidations } from "app/forms/form-utilities/form.utilities";
import { IndexerService, IIndexerDetails } from "app/rf/indexer/indexer.service";

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

interface IIndexerRegistrationComponentFormErrors {
	[index: string]: string[],
	indexerDescription: string[],
	indexerCode: string[],
	indexerPercentage: string[],
}

@Component({
	selector: 'ms-indexerregistration',
	templateUrl: './indexer-registration.component.html',
	providers: [
		IndexerService
	],
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./indexer-registration.component.scss'],
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class IndexerRegistrationComponent implements OnInit, OnDestroy, IFormComponent {
	
	@BlockUI() blockUI: NgBlockUI;
	public form: FormGroup;
	public header: string;
	private routeSubscription;
	private indexerId: number;

	constructor(private fb: FormBuilder, 
				private pageTitleService: PageTitleService,
				private toastrService: ToastrService,
				private activatedRoute: ActivatedRoute,
				private indexerService: IndexerService) { }

	private buildFormGroup() {
		return this.fb.group({
			indexerCode: [null, Validators.compose([Validators.required, Validators.maxLength(10)])],
			indexerDescription: [null, Validators.compose([Validators.required])],
			indexerPercentage: [null, Validators.compose([Validators.required, CustomValidations.isValueNumber])]
		});
	}

	private assignFormValues (indexerDetails: IIndexerDetails) {
		this.form.controls['indexerCode'].setValue(indexerDetails.indexerCode);
		this.form.controls['indexerDescription'].setValue(indexerDetails.indexerDescription);
		this.form.controls['indexerPercentage'].setValue(indexerDetails.indexerPercentage);
	}

	public formErrors: IIndexerRegistrationComponentFormErrors = {
		indexerDescription: [],
		indexerCode: [],
		indexerPercentage: [],
	}
	
	public formArrayErrors: { [index: string]: Array<IArrayItemErrors> } = {}

	public saveIndexer(indexer) {
		this.blockUI.start('Salvando...');

		setTimeout(() => {
			this.toastrService.success("Indexador salvo com sucesso");
			this.blockUI.stop();
		}, 2000);
	}

	public getForms () {
		return [this.form]
	}

	public validationMessages: { [index: string]: { [property: string]: string } } = {
		indexerCode: {
			'required': 'Informe o código do indexador.'
		},
		indexerDescription: {
			'required': 'Informe a descrição do indexador.'
		},
		indexerPercentage: {
			'required': 'Informe a porcentagem do indexador.'
		}
	}

	ngOnInit() {
		this.pageTitleService.title.subscribe((val: string) => {
			this.header = val;
		});

		this.routeSubscription = this.activatedRoute
			.params
			.do(() => this.blockUI.start())
			.flatMap(params => {
				this.form = this.buildFormGroup();

				if (!params['id']) {
					return Observable.of(null);
				}

				this.indexerId = +params['id'];
				return this.indexerService.get(this.indexerId);
			})
			.do(() => this.blockUI.stop())
			.subscribe((indexerDetails: IIndexerDetails) => {
				this.pageTitleService.setTitle(this.indexerId
					? `Edição do indexador ${this.indexerId}`
					: "Cadastro de indexador");

				if (indexerDetails) {
					this.assignFormValues(indexerDetails);
				}

				this.form.valueChanges.subscribe(data => updateValidations(this));
			});
	}

	ngOnDestroy() {
		this.routeSubscription.unsubscribe();
	}
}
