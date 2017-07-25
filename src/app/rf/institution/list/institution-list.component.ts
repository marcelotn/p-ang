import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { InstitutionService, IInstitution } from "../institution.service";
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../../core/route-animation/route.animation";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DialogsService } from "../../../dialogs/dialogs.service";
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'

interface IChangePageEvent { offset: number }

@Component({
    templateUrl: './institution-list.component.html',
    providers: [
        InstitutionService,
        DialogsService
    ],
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [fadeInAnimation]
})

export class InstitutionListComponent implements OnInit {

    constructor(private institutionService: InstitutionService,
        private pageTitleService: PageTitleService,
        private dialogsService: DialogsService,
        private toastrService: ToastrService,
        private router: Router) { }

    @BlockUI() blockUI: NgBlockUI;
    @ViewChild('chkBxTmpl') chkBxTmpl: TemplateRef<any>;

    public header;
    public pendingInstitutionListRequests = 0;

    public paginationData = {
        currentPage: 0,
        rows: [],
        totalElements: 0,
        itemsPerPage: 0
    };

    public editInstitution(institution: IInstitution) {
        this.router.navigate(['/institution/edit', institution.id]);
    }

    public removeInstitution(institution: IInstitution) {
        this.dialogsService
            .confirm(`Remover instituição #${institution.id}`, 'Você tem certeza que deseja prosseguir?')
            .switchMap(confirmed => {
                if (!confirmed) {
                    return Observable.empty();
                }

                return Observable.of(institution.id);
            })
            .do(id => this.blockUI.start("Removendo instituição..."))
            .flatMap(this.institutionService.removeInstitution)
            .subscribe(
            (response: { result: string }) => {
                if (response.result == 'success') {
                    this.toastrService.success("Instituição removida com sucesso");
                } else {
                    this.toastrService.error("Ocorreu uma falha ao remover a instituição");
                }
            },
            (error) => this.toastrService.error("Ocorreu uma falha ao remover a instituição"),
            this.blockUI.stop
            );

    }

    public loadInstitutions(changePageEvent: IChangePageEvent) {
        this.blockUI.start();
        this.pendingInstitutionListRequests++;
        this.institutionService.getPaginatedInstitutions(changePageEvent.offset)
            .subscribe(pagedData => {
                this.paginationData.currentPage = changePageEvent.offset;
                this.paginationData.rows = pagedData.rows;
                this.paginationData.totalElements = pagedData.totalElements;
                this.paginationData.itemsPerPage = pagedData.itemsPerPage;
                this.blockUI.stop();
                window.scrollTo(0, 0);
                this.pendingInstitutionListRequests--;
            });
    }

    ngOnInit() {
        this.pageTitleService.title.subscribe((val: string) => {
			this.header = val;
        });
        
        this.pageTitleService.setTitle("Lista de instituições");
        this.loadInstitutions({ offset: 0 });
    }
}