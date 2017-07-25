import { ValidatorFn, AbstractControl } from '@angular/forms';

export module CustomValidations {

    /// <amd-dependency path="cpf_cnpj" />
	declare var require: (moduleId: string) => any;
    const cpf_cnpj = require("cpf_cnpj");
   
	export const isValueNumber : ValidatorFn = (input: AbstractControl) => {
		if (isNaN(input.value)) {
			return { "isNotANumber": true };
		}

		return null;
    }
    
    export const isValidCNPJ : ValidatorFn = (input: AbstractControl) => {
		if (!input.value || cpf_cnpj.CNPJ.isValid(input.value)) {
		    return null;
		}

		return { "invalidCnpj": true };
	}
}
