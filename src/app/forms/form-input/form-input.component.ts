import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
	selector: 'form-input',	
	templateUrl: './form-input.component.html'
})

export class FormInputComponent {

    @Input()
    public label: string;
    @Input()
    public control: AbstractControl;
    @Input()
    public errors: string[];

}