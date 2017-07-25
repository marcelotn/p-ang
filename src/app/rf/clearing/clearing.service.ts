import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core'


export interface IClearing {
    id: number,
    code: string
}

@Injectable()
export class ClearingService {

    public getClearings(): Observable<IClearing[]> {
        return Observable.of([
            { id: 1, code: "teste câmara de custodia 1" },
            { id: 2, code: "teste câmara de custodia 2" }
        ]);
    }
}
