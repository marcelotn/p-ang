import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core'
import { Pagination } from '../../models/pagination/IPaginatedResult'
import * as _ from 'lodash'

export interface IIndexer {
    id: number,
    code: string
}

export interface IIndexerDetails {
    indexerDescription: string,
    indexerCode: number,
    indexerPercentage: number
}

@Injectable()
export class IndexerService {

    public get(indexerId: number): Observable<IIndexerDetails> {
        return Observable.of({
            indexerDescription: '1',
            indexerCode: 1,
            indexerPercentage: 1,
        });
    }

    public removeIndexer(indexerId: number) {
        console.log(`removendo ${indexerId}`)
        return Observable.of({ result: 'success' }).delay(1500);
    }

    public getPaginatedIndexers(page, itemsPerPage = 10): Observable<Pagination.IPaginatedResult<IIndexer>> {
        var from = page * itemsPerPage;
        var to = (page + 1) * itemsPerPage;
        var totalElements = 33;

        var results = _.map(_.range(from, to), x => ({ id: x, code: `indexador ${x}` }));

        return Observable.of({
            rows: results,
            totalElements,
            totalPages: Math.ceil(totalElements / itemsPerPage),
            itemsPerPage
        }).delay(1500);
    }

    public getIndexers(): Observable<IIndexer[]> {
        return Observable.of([
            { id: 1, code: "teste indexador 1" },
            { id: 2, code: "teste indexador 2" }
        ]);
    }
}
