import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core'
import { Pagination } from '../../models/pagination/IPaginatedResult'
import * as _ from 'lodash'
import { IAutoCompleteEntityService } from "app/autocomplete/abstract-autocomplete.component";

export interface IPricingProcessModel {
    id: string,
    code: string
}

@Injectable()
export class PricingProcessModelService implements IAutoCompleteEntityService<IPricingProcessModel> {

    public get(preficiationModelId: string): Observable<IPricingProcessModel> {
        var preficiationModelDetail = {
            id: preficiationModelId,
            code: `sample institution ${preficiationModelId}`
        };

        return Observable.of(preficiationModelDetail).delay(850);
    }

    public search(term: string): Observable<IPricingProcessModel[]> {
        if (!term) {
            return Observable.of([]);
        }

        if (term == "nooo") {
            return Observable.of([]).delay(500);
        }

        var items = _.map(_.range(0, 3), x => ({
            id: x.toString(),
            code: `${term} ${x}`
        }));

        return Observable.of(items).delay(1500);
    }
}