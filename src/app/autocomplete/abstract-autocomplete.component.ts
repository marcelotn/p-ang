import { Observable } from 'rxjs/Rx';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import { Subscription } from "rxjs/Subscription";

export interface IAutoCompleteEntityService<TEntity> {
	get: (id: string) => Observable<TEntity>
	search: (query: string) => Observable<TEntity[]>
}

export abstract class AbstractAutocompleteComponent<TEntity> implements OnInit, OnDestroy {

	abstract displayEntityFunction: (item: TEntity) => string;
	abstract isValidSelection(arg: any): arg is TEntity;

	@Input()
	public label: string;
	@Input()
	public control: AbstractControl;
	@Input()
	public controlErrors: string[];
	@Input()
	public idInitialized: EventEmitter<string>;

	@Output()
	public isBusyStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

	public filteredOptions: Observable<TEntity[]>;
	public pendingRequests: number = 0;

	private options: TEntity[];

	private entityService: IAutoCompleteEntityService<TEntity>;

	private loadData(id: string) {
		this.pendingRequests++;
		return this.entityService
			.get(id)
			.subscribe(
			option => {
				this.options = [option];
				this.control.setValue(option);
			},
			(error) => console.log(error),
			() => this.decrementPendingRequestsCount()
			)
	}

	private lastTermSearched = "";
	private lastTermResult = [];

	private decrementPendingRequestsCount() {
		if (this.pendingRequests > 0) {
			this.pendingRequests--;
		}

		if (this.pendingRequests == 0) {
			this.isBusyStateChanged.emit(false);
		}
	}

	private validationEvaluationAttemptCount = 0;

	public triggerValidationEvaluation() {
		if (this.isValidSelection(this.control.value)) {
			return;
		}

		try {
			this.control.updateValueAndValidity();
			this.validationEvaluationAttemptCount = 0;
		} catch (error) {
			var msg = "error triggering validation evaluation, in institution autocomplete component";
			console.log(msg, error);

			if (this.validationEvaluationAttemptCount <= 3) {
				this.validationEvaluationAttemptCount++;
				setTimeout(() => this.triggerValidationEvaluation(), 500);
			}
			else {
				this.validationEvaluationAttemptCount = 0;
			}
		}
	}

	private assignEntitySearch() {
		this.filteredOptions = this.control
			.valueChanges
			.do(() => this.isBusyStateChanged.emit(true))
			.startWith(null)
			.debounceTime(500)
			.switchMap(val => {
				if (!val || this.isValidSelection(val)) {
					this.isBusyStateChanged.emit(false);
					return Observable.of(null);
				}
				var isValueLastSearchedTerm = this.lastTermSearched == val;

				if (isValueLastSearchedTerm) {
					this.isBusyStateChanged.emit(false);
					return Observable.of(this.lastTermResult);
				}

				this.lastTermSearched = val;

				this.pendingRequests++;
				return this.entityService
					.search(val)
					.catch(err => {
						this.decrementPendingRequestsCount();
						throw err;
					})
					.finally(() => {
						this.lastTermResult = this.options;
						this.decrementPendingRequestsCount();
						this.triggerValidationEvaluation();
					});
			})
			.do(x => {
				this.options = x;
				if (x && x.length == 0) {
					this.control.markAsTouched();
				}
			});
	}

	private noItemsFound: ValidatorFn = (input: AbstractControl) => {
		if (this.options && this.options.length == 0) {
			return { "autocompleteNoItemsFound": true };
		}

		return null;
	}

	private validOptionSelected: ValidatorFn = (input: AbstractControl) => {
		if (this.isValidSelection(input.value)) {
			return null;
		}

		if (this.pendingRequests == 0 && (!this.options || this.options.length == 0)) {
			return null;
		}

		return { "autocompleteItemNotSelected": true };
	}

	private subscription: Subscription;

	constructor(service: IAutoCompleteEntityService<TEntity>) {
		this.entityService = service;
	}

	public ngOnInit(): void {
		this.subscription = this.idInitialized.subscribe(
			id => {
				this.loadData(id);
			}
		)
		this.assignEntitySearch();

		this.control.setValidators(Validators.compose([
			this.control.validator,
			this.validOptionSelected,
			this.noItemsFound
		]));
	}

	public ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}