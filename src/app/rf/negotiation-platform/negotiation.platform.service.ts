import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core'

export interface INegotiationPlatform {
    id: number,
    code: string
}

@Injectable()
export class NegotiationPlatformService {

    public getNegotiationPlatforms(): Observable<INegotiationPlatform[]> {
        return Observable.of([
            { id: 1, code: "test plataforma 1" },
            { id: 2, code: "test plataforma 2" }
        ]);
    }
}
