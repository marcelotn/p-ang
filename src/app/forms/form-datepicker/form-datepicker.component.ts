import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
	selector: 'form-datepicker',	
	templateUrl: './form-datepicker.component.html'
})

export class FormDatepickerComponent {

    @Input()
    public label: string;
    @Input()
    public control: AbstractControl;
    @Input()
    public errors: string[];

}