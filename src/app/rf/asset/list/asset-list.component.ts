import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { AssetService, IAsset } from "../../asset/asset.service";
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../../core/route-animation/route.animation";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DialogsService } from "../../../dialogs/dialogs.service";
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'

interface IChangePageEvent { offset: number }

@Component({
    selector: 'ms-asselist',
    templateUrl: './asset-list.component.html',
    providers: [
        AssetService,
        DialogsService
    ],
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})

export class AssetListComponent implements OnInit {

    constructor(private assetService: AssetService,
        private pageTitleService: PageTitleService,
        private dialogsService: DialogsService,
        private toastrService: ToastrService,
        private router: Router) { }

    @BlockUI() blockUI: NgBlockUI;

    @ViewChild('chkBxTmpl') chkBxTmpl: TemplateRef<any>;

    public pendingAssetsListRequests = 0;

    public paginationData = {
        currentPage: 0,
        rows: [],
        totalElements: 0,
        itemsPerPage: 0
    };

    public editAsset(asset: IAsset) {
        this.router.navigate(['/asset/edit', asset.id]);
    }

    public removeAsset(asset : IAsset) {
        this.dialogsService
            .confirm(`Remover ativo #${asset.id}`, 'Você tem certeza que deseja prosseguir?')
            .switchMap(confirmed => {
                if (!confirmed) {
                    return Observable.empty();
                }

                return Observable.of(asset.id);                
            })
            .do(id => this.blockUI.start("Removendo ativo..."))
            .flatMap(this.assetService.removeAsset)
            .subscribe(
            (response: { result: string }) => {
                if (response.result == 'success') {
                    this.toastrService.success("Ativo removido com sucesso");
                } else {
                    this.toastrService.error("Ocorreu uma falha ao remover ativo");
                }
            },
            (error) => this.toastrService.error("Ocorreu uma falha ao remover ativo"),
            this.blockUI.stop
            );

    }

    public loadAssets(changePageEvent: IChangePageEvent) {
        this.blockUI.start();
        this.pendingAssetsListRequests++;
        this.assetService.getPaginatedAssets(changePageEvent.offset)
            .subscribe(pagedData => {
                this.paginationData.currentPage = changePageEvent.offset;
                this.paginationData.rows = pagedData.rows;
                this.paginationData.totalElements = pagedData.totalElements;
                this.paginationData.itemsPerPage = pagedData.itemsPerPage;
                this.blockUI.stop();
                window.scrollTo(0, 0);
                this.pendingAssetsListRequests--;
            });
    }

    ngOnInit() {
        this.pageTitleService.setTitle("Lista de Ativos");
        this.loadAssets({ offset: 0 });
    }
}