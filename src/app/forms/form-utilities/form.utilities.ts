import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import * as _ from 'lodash'

export interface IArrayItemErrors {
	[key: string]: string[]
}

export interface IFormComponent {
	getForms: () => FormGroup[],
	formErrors: { [index: string]: string[] }
	formArrayErrors: { [index: string]: Array<IArrayItemErrors> }
	validationMessages: { [index: string]: { [property: string]: string } }
}

function getControl(controlKey: string, forms: FormGroup[]) {
	for (var i = 0; i < forms.length; i++) {
		const form = forms[i];
		var control = form.get(controlKey);
		if (control) {
			return control;
		}
	}
}

function assignArrayControlErrors(arrayControl: FormArray,
	formComponent: IFormComponent,
	field: string) {

	for (var i = 0; i < arrayControl.controls.length; i++) {
		const arrayItemControl = <FormGroup>arrayControl.controls[i];

		if (!formComponent.formArrayErrors[field][i]) {
			formComponent.formArrayErrors[field][i] = {};
		}

		_.each(arrayItemControl.controls, (c, key) => {
			formComponent.formArrayErrors[field][i][key] = getFieldError(c, key, formComponent);
		});
	}
}

function getFieldError(control: AbstractControl,
	field: string,
	formComponent: IFormComponent) {

	var errorMessageArray = [];

	if (!control || !control.dirty || control.valid) {
		return;
	}

	const messages = formComponent.validationMessages[field];

	if (!messages) {
		var errors = _.reduce(_.keys(control.errors), (acc, v) => acc + ", " + v);
		console.log(`no validation messages registered for field ${field}. Validation errors: ${errors}`)
		return;
	}

	for (const key in control.errors) {
		errorMessageArray.push(messages[key]);
	}

	return errorMessageArray;
}

export function updateValidations(formComponent: IFormComponent) {
	const forms = formComponent.getForms();
	if (!forms) { return; }

	for (const field in formComponent.formArrayErrors) {
		const control = getControl(field, forms);

		var isControlArray = control instanceof FormArray;

		if (!isControlArray) {
			continue;
		}

		var arrayControl = <FormArray>control;
		assignArrayControlErrors(arrayControl, formComponent, field);
	}

	for (const field in formComponent.formErrors) {
		const control = getControl(field, forms);

		formComponent.formErrors[field] = getFieldError(control, field, formComponent);
	}
}
