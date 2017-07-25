import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core'
import { Pagination } from '../../models/pagination/IPaginatedResult'
import * as _ from 'lodash'
import * as moment from 'moment';

export interface IAsset {
    id: number,
    code: string
}

export interface IAssetType {
    id: number,
    code: string
}

export interface ICreateAssetCommand {
    code: string
}

export interface IAssetDetails {
    paperCode: string,
    clearingCode: number,
    negotiationPlatform: number,
    clearingFee: number,
    paperType: string,
    isin: string,
    indexer: string,
    issuer: number,
    registrationType: number,
    percentualFee: number,
    spreadFee: number,
    debtorId: string,
    emissionValue: number,
    emissionDate: Date,
    rentabilityEmissionDate: Date,
    maturityDate: Date,
}

export interface IAssetRegistrationTypeOption {
    id: number,
    code: string
}

@Injectable()
export class AssetService {

    public getAssetRegistrationTypeOptions(): Observable<IAssetRegistrationTypeOption[]> {
        return Observable.of(
            [
                { id: 1, code: "tipo de cadastro 1" },
                { id: 2, code: "tipo de cadastro 2" }
            ]
        );
    }

    public getAssetTypeOptions ():Observable<IAssetType[]> {
        var options = _.map(_.range(0,2), x => ({ id: x, code: `asset type ${x}`}) );
        return Observable.of(options).delay(850);
    }

    public get(assetId: number): Observable<IAssetDetails> {
        return Observable.of({
            paperCode: "1",
            clearingCode: 1,
            negotiationPlatform: 1,
            clearingFee: 1,
            paperType: "1",
            isin: "1",
            indexer: "1",
            issuer: 1,
            registrationType: 1,
            percentualFee: 1,
            spreadFee: 1,
            debtorId: "2",
            emissionValue: 1,
            emissionDate: moment().add('days', 30).toDate(),
            rentabilityEmissionDate: moment().add('days', 30).toDate(),
            maturityDate: moment().add('days', 30).toDate(),
        }).delay(1000);
    }

    public getPaginatedAssets(page, itemsPerPage = 10): Observable<Pagination.IPaginatedResult<IAsset>> {
        var from = page * itemsPerPage;
        var to = (page + 1) * itemsPerPage;
        var totalElements = 30;

        var results = _.map(_.range(from, to), x => ({ id: x + 1, code: `ativo ${x}` }));

        return Observable.of({
            rows: results,
            totalElements,
            totalPages: Math.ceil(totalElements / itemsPerPage),
            itemsPerPage
        }).delay(1500);
    }

    public saveAsset(data) {
        return Observable.of({ generatedId: '111b' })
            .delay(1000);
    }

    public saveDebtorData(data) {
        return Observable.of({ result: 'success' })
            .delay(1000);
    }

    public saveValorizationData(data) {
        return Observable.of({ result: 'success' })
            .delay(1000);
    }

    public saveValidityData(data) {
        return Observable.of({ result: 'success' })
            .delay(1000);
    }

    public removeAsset(assetId: number) {
        console.log(`removendo ${assetId}`)
        return Observable.of({ result: 'success' }).delay(1500);
    }

    public getAssets(): Observable<IAsset[]> {
        return Observable.of([
            { id: 1, code: "teste ativo 1" },
            { id: 2, code: "teste ativo 2" }
        ]);
    }

    public createAsset(command: ICreateAssetCommand): Observable<IAsset> {
        return Observable.of({ id: 99, code: command.code });
    }
}
