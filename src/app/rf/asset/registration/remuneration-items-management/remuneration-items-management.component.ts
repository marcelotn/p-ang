
import { IFormComponent, IArrayItemErrors, updateValidations } from "app/forms/form-utilities/form.utilities";
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { CustomValidations } from "app/forms/form-validation/custom.validators";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'remuneration-items-management',
    templateUrl: './remuneration-items-management.component.html'
})

export class RemunerationItemsManagementComponent implements IFormComponent, OnInit {

    private buildForm() {
        this.remunerationControl = new FormArray([]);
        this.addRemunerationData();

        this.remunerationForm = this.formBuilder.group({
            remunerationGroup: this.remunerationControl
        });

        this.remunerationForm.valueChanges.subscribe(data => {
            updateValidations(this);
        });
    }

    public ngOnInit(): void {
        this.buildForm();
    }

    public getForms() {
        return [this.remunerationForm];
    }
    
	public removeRemunerationData(valorizationControl) {
		var index = this.remunerationControl.controls.indexOf(valorizationControl);
		this.remunerationControl.removeAt(index);
	}

    public validationMessages: { [index: string]: { [property: string]: string; }; } = {
        indexerId: {
            required: "Informe o indexador"
        },
        calculusDate: {
            required: "Informe a data de cálculo"
        },
        spreadFee: {
            required: "Informe a taxa de spread",
            isNotANumber: "Taxa de spread deve ser um valor numérico"
        },
        percentualValue: {
            required: "Informe o valor percentual",
            isNotANumber: "Valor percentual deve ser um valor numérico"
        },
        scalationDays: {
            required: "Informe os dias de escalonamento ",
            isNotANumber: "Dias de escalonamento deve ser um valor numérico"
        },
    }

    public remunerationControl: FormArray;

    public remunerationForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    public formErrors: { [index: string]: string[] } = {}

    public formArrayErrors: { [index: string]: Array<IArrayItemErrors> } = {
        remunerationGroup: []
    }

    public addRemunerationData() {
        var remunerationFormGroup = this.formBuilder.group({
            indexerId: [null, Validators.required],
            calculusDate: [null, Validators.required],
            spreadFee: [null, Validators.compose([Validators.required, CustomValidations.isValueNumber])],
            percentualValue: [null, Validators.compose([Validators.required, CustomValidations.isValueNumber])],
            scalationDays: [null, Validators.compose([Validators.required, CustomValidations.isValueNumber])],
        });

        this.formArrayErrors['remunerationGroup'].push({
            'indexerId': [],
            'calculusDate': [],
            'spreadFee': [],
            'percentualValue': [],
            'scalationDays': [],
        });

        this.remunerationControl.push(remunerationFormGroup);
    }

    public removeValorizationData(valorizationControl) {
        var index = this.remunerationControl.controls.indexOf(valorizationControl);
        this.remunerationControl.removeAt(index);
    }
}