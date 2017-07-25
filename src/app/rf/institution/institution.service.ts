import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core'
import { Pagination } from '../../models/pagination/IPaginatedResult'
import * as _ from 'lodash'
import { IAutoCompleteEntityService } from "app/autocomplete/abstract-autocomplete.component";

export interface IInstitution {
    id: string,
    code: string
}

export interface IInstitutionDetails {
    id: string,
    code: string,
    socialName: string,
    institutionName: string,
    contactPhoneNumber: string,
    shortInstitutionName: string,
    institutionCode: string,
    institutionCnpj: string,
    mnemonicCode: string,
    economicNatureId: number,
}

@Injectable()
export class InstitutionService implements IAutoCompleteEntityService<IInstitution>{

    public removeInstitution(institutionId: number) {
        console.log(`removendo instituição ${institutionId}`)
        return Observable.of({ result: 'success' }).delay(1500);
    }

    public search(term: string): Observable<IInstitution[]> {
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

    public get(institutionId: string): Observable<IInstitutionDetails> {
        var institutionDetail: IInstitutionDetails = {
            id: institutionId,
            code: `sample institution ${institutionId}`,
            socialName: '1',
            institutionName: '1',
            shortInstitutionName: '1',
            institutionCode: '1',
            institutionCnpj: '68813028000181',
            mnemonicCode: '1',
            economicNatureId: 1,
            contactPhoneNumber: '+55 11 98888-4444'
        };

        return Observable.of(institutionDetail).delay(850);
    }

    public getPaginatedInstitutions(page, itemsPerPage = 10): Observable<Pagination.IPaginatedResult<IInstitution>> {
        var from = page * itemsPerPage;
        var to = (page + 1) * itemsPerPage;
        var totalElements = 33;

        var results = _.map(_.range(from, to), x => ({
            id: (x + 1).toString(),
            code: `instituição ${x}`
        }));

        return Observable.of({
            rows: results,
            totalElements,
            totalPages: Math.ceil(totalElements / itemsPerPage),
            itemsPerPage
        }).delay(1500);
    }

    public getInstitutions(): Observable<IInstitution[]> {
        return Observable.of([
            { id: "1", code: "teste instituição 1" },
            { id: "2", code: "teste instituição 2" }
        ]);
    }
}
