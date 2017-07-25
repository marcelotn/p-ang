import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../../core/route-animation/route.animation";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DialogsService } from "../../../dialogs/dialogs.service";
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import {Router } from '@angular/router'
import { IndexerService, IIndexer } from "app/rf/indexer/indexer.service";

interface IChangePageEvent { offset: number }

@Component({
    templateUrl: './indexer-list.component.html',
    providers: [
        IndexerService,
        DialogsService
    ],
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})

export class IndexerListComponent implements OnInit {

    constructor(private indexerService: IndexerService,
        private pageTitleService: PageTitleService,
        private dialogsService: DialogsService,
        private toastrService: ToastrService,
        private router: Router) { }

    @BlockUI() blockUI: NgBlockUI;

    @ViewChild('chkBxTmpl') chkBxTmpl: TemplateRef<any>;

    public pendingIndexerListRequests = 0;

    public paginationData = {
        currentPage: 0,
        rows: [],
        totalElements: 0,
        itemsPerPage: 0
    };

    public editIndexer(indexer: IIndexer) {
        this.router.navigate(['/indexer/edit', indexer.id]);
    }

    public removeIndexer(indexer : IIndexer) {
        this.dialogsService
            .confirm(`Remover indexador #${indexer.id}`, 'Você tem certeza que deseja prosseguir?')
            .switchMap(confirmed => {
                if (!confirmed) {
                    return Observable.empty();
                }

                return Observable.of(indexer.id);                
            })
            .do(id => this.blockUI.start("Removendo indexador..."))
            .flatMap(this.indexerService.removeIndexer)
            .subscribe(
            (response: { result: string }) => {
                if (response.result == 'success') {
                    this.toastrService.success("Indexador removido com sucesso");
                } else {
                    this.toastrService.error("Ocorreu uma falha ao remover indexador");
                }
            },
            (error) => this.toastrService.error("Ocorreu uma falha ao remover indexador"),
            this.blockUI.stop
            );

    }

    public loadIndexers(changePageEvent: IChangePageEvent) {
        this.blockUI.start();
        this.pendingIndexerListRequests++;
        this.indexerService.getPaginatedIndexers(changePageEvent.offset)
            .subscribe(pagedData => {
                this.paginationData.currentPage = changePageEvent.offset;
                this.paginationData.rows = pagedData.rows;
                this.paginationData.totalElements = pagedData.totalElements;
                this.paginationData.itemsPerPage = pagedData.itemsPerPage;
                this.blockUI.stop();
                window.scrollTo(0, 0);
                this.pendingIndexerListRequests--;
            });
    }

    ngOnInit() {
        this.pageTitleService.setTitle("Lista de Indexadores");
        this.loadIndexers({ offset: 0 });
    }
}