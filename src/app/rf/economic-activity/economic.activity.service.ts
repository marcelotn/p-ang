import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core'
import * as _ from 'lodash';

export interface IEconomicActivity {
    id: string,
    description: string
}

export class EconomicActivityService {

    public get(economicActivityId: string): Observable<IEconomicActivity> {
        console.log(`fetching ${economicActivityId}`)
        return Observable.of({
            id: economicActivityId,
            description: `economic activity sample ${economicActivityId}`
        }).delay(1500);
    }

    public search(term: string): Observable<IEconomicActivity[]> {
        console.log(`searching ${term}`)
        if (!term) {
            return Observable.of([]);
        }

        var items = _.map(_.range(0, 3), x => ({
            id: x.toString(),
            description: `${term} ${x}`
        }));

        return Observable.of(items).delay(1500);
    }

}
