import { Component, OnInit, OnDestroy, ViewEncapsulation, EventEmitter, Output, Input, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { IStepChangeEvent, StepState, TdMediaService, StepMode } from '@covalent/core';
import { ToastrService } from 'ngx-toastr';
import { AssetService, IAssetDetails } from '../../asset.service';
import { IClearing } from '../../../clearing/clearing.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as _ from 'lodash';
import { IFormComponent, updateValidations, IArrayItemErrors } from "app/forms/form-utilities/form.utilities";

@Component({
    selector: 'asset-registration-basic-data',
    templateUrl: './asset-registration-basic-data.component.html',
    styleUrls: ['./asset-registration-basic-data.component.scss'],
    providers: [
        AssetService,
        TdMediaService
    ],
    encapsulation: ViewEncapsulation.None,
})

export class AssetRegistrationBasicDataComponent implements OnInit, OnDestroy, IFormComponent {

    public autoCompleteBusy = false;

    public clearingsControl: FormArray;

    public basicDataInitialForm: FormGroup;
    public basicDataIssuingForm: FormGroup;

    public initialStepState: StepState = StepState.None;
    public issuingStepState: StepState = StepState.None;
    public remunerationStepState: StepState = StepState.None;

    public stepperMode: StepMode;

    public issuingStepDisabled = true;
    public remunerationStepDisabed = true;

    public debtorIdInitialized: EventEmitter<string> = new EventEmitter<string>();
    public assetId: string = null;
    public debtorsControl: FormArray;

    @Output()
    public issuerIdInitialized: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public fiduciaryAgentIdInitialized: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public basicDataSubmitted: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public basicDataChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    public assetInitialized: EventEmitter<IAssetDetails>;

    private initializeFormGroups() {
        let basicDataForms = this.buildBasicFormGroup();

        this.basicDataInitialForm = basicDataForms.basicDataInitialForm;
        this.basicDataIssuingForm = basicDataForms.basicDataIssuingForm;

        this.basicDataInitialForm.valueChanges.subscribe(data => {
            updateValidations(this);
            this.issuingStepDisabled = !this.basicDataInitialForm.valid;
            this.initialStepState = this.basicDataInitialForm.valid
                ? StepState.Complete
                : StepState.None;
        });

        this.basicDataIssuingForm.valueChanges.subscribe(data => {
            updateValidations(this);
            this.remunerationStepDisabed = !this.basicDataIssuingForm.valid;
            this.issuingStepState = this.basicDataIssuingForm.valid
                ? StepState.Complete
                : StepState.None;
        });
    }

    public addDebtor() {
        var debtorFormGroup = new FormGroup({
            debtorId: new FormControl(null, Validators.required)
        });
        this.debtorsControl.push(debtorFormGroup);
        this.formArrayErrors['debtors'].push({ 'debtorId': [] });
    }

    public removeDebtor(debtorControl: AbstractControl) {
        var index = this.debtorsControl.controls.indexOf(debtorControl);
        this.debtorsControl.removeAt(index);
    }

    private assignFormsValues(assetData: IAssetDetails) {
        setTimeout(() => this.issuerIdInitialized.emit(assetData.indexer), 150);
    }

    private buildBasicFormGroup() {
        this.clearingsControl = new FormArray([], Validators.minLength(1));
        this.addClearing();

        let basicDataInitialForm = this.formBuilder.group({
            paperTypeId: new FormControl(null, Validators.required),
            paperCode: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(50)])),
            maturityDate: new FormControl(null, Validators.required),
            warranty: [null],
			dailyLiquidity: [null],
			law12431: [null],
            isin: new FormControl(null, Validators.compose([Validators.maxLength(50)])),
        });

        this.debtorsControl = new FormArray([]);
        this.addDebtor();

        let basicDataIssuingForm = this.formBuilder.group({
            issuer: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(100)])),
            issuingValue: new FormControl(null, Validators.required),
            issuingDate: new FormControl(null, Validators.required),            
            issuingQuantity: new FormControl(null, Validators.required),
            issuingNumber: new FormControl(null, Validators.required),
            issuingSerialNumber: new FormControl(null, Validators.required),
            debtors: this.debtorsControl,
            pulverized: [null],
            clearings: this.clearingsControl,
            fiduciaryAgent: new FormControl(null, Validators.required),
            negotiationPlatformId: new FormControl(null, Validators.compose([Validators.required])),
        });

        return {
            basicDataInitialForm,
            basicDataIssuingForm
        };
    }

    @BlockUI() blockUI: NgBlockUI;

    constructor(private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private assetService: AssetService,
        private mediaService: TdMediaService,
        private ngZone: NgZone) { }

    public addClearing() {
        var clearingFormGroup = new FormGroup({
            clearingId: new FormControl(null, Validators.required),
            clearingTicker: new FormControl(null)
        });
        this.clearingsControl.push(clearingFormGroup);
    }

    private assignStepperMode(greaterThanSMMatches: boolean) {
        this.stepperMode = greaterThanSMMatches
            ? StepMode.Horizontal
            : StepMode.Vertical;
    }

    public watchScreen() {
        var greaterThanSMMatches = this.mediaService.query('gt-sm');
        this.assignStepperMode(greaterThanSMMatches);

        this.mediaService
            .registerQuery('gt-sm')
            .subscribe((matches: boolean) => {
                this.assignStepperMode(matches);
            });
    }

    public removeClearing(clearingControl) {
        var index = this.clearingsControl.controls.indexOf(clearingControl);
        this.clearingsControl.removeAt(index);
    }

    public saveAsset() {
        var basicData = _.merge(
            // this.basicDataClearingForm.value,
            this.basicDataIssuingForm.value,
            this.basicDataInitialForm.value,
            // this.basicDataNegotiationForm.value
        );

        basicData.issuerId = basicData.issuer.id;
        basicData.fiduciaryAgentId = basicData.fiduciaryAgent.id;

        console.log('data submitted', basicData);

        this.blockUI.start('Salvando...');
        this.assetService.saveAsset(basicData)
            .subscribe(
            (response) => {
                this.toastrService.success("Ativo salvo com sucesso");
                if (response.generatedId) {
                    this.assetId = response.generatedId;
                }
                this.basicDataSubmitted.emit(this.assetId);
            },
            (error) => console.log(error),
            () => this.blockUI.stop()
            );
    }

    public getForms() {
        return [
            this.basicDataInitialForm,
            this.basicDataIssuingForm,
        ];
    }

    public formErrors: { [index: string]: string[] } = {
        paperTypeId: [],
        paperCode: [],
        maturityDate: [],
        isin: [],
        issuer: [],
        clearingCode: [],
        negotiationPlatformId: [],
        fiduciaryAgent: []
    }

    public formArrayErrors: { [index: string]: Array<IArrayItemErrors> } = {
        debtors: [],
        valorizationGroup: []
    }

    public validationMessages: { [index: string]: { [property: string]: string; } } =
    {
        paperCode: {
            required: 'Informe o código do papel',
            maxLength: 'O código do papel pode possuir no máximo 50 caracteres'
        },
        debtorId: {
            required: 'Informe o devedor',
            autocompleteItemNotSelected: 'Uma opção deve ser escolhida',
            autocompleteNoItemsFound: 'Nenhuma opção foi retornada, utilize outro termo para a busca'
        },
        clearingCode: {
            required: 'Informe a câmara custódia',
            maxLength: 'A câmara custódia pode possuir no máximo 50 caracteres'
        },
        negotiationPlatformId: {
            required: 'Informe a plataforma de negocição',
            maxLength: 'A plataforma de negocição pode possuir no máximo 100 caracteres'
        },
        clearingFee: {
            required: 'Informe a taxa de custódia',
            isNotANumber: 'A taxa de custódia deve ser um número'
        },
        paperTypeId: {
            required: 'Informe o tipo de papel',
            maxLength: 'O tipo de papel pode possuir no máximo 50 caracteres'
        },
        isin: {
            maxLength: 'O ISIN pode possuir no máximo 50 caracteres'
        },
        fiduciaryAgent: {
            required: 'Informe o agente fiduciário',
            autocompleteItemNotSelected: 'Uma opção deve ser escolhida',
            autocompleteNoItemsFound: 'Nenhuma opção foi retornada, utilize outro termo para a busca'
        },
        issuer: {
            required: 'Informe o emissor',
            autocompleteItemNotSelected: 'Uma opção deve ser escolhida',
            autocompleteNoItemsFound: 'Nenhuma opção foi retornada, utilize outro termo para a busca'
        },
    }

    public ngOnInit(): void {
        this.watchScreen();
        this.initializeFormGroups();
        this.assetInitialized.subscribe(
            (assetData) => {
                this.assignFormsValues(assetData);
                //setTimeout(() => { this.debtorIdInitialized.emit(assetData.debtorId), 150 });
            }
        )
    }

    public ngOnDestroy(): void {
        this.assetInitialized.unsubscribe();
    }
}