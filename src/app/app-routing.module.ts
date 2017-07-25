import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent }   from './main/main.component';
import { DashboardComponent }  from './dashboard/dashboard-v1/dashboard.component';
import { DashboardOneComponent }  from './dashboard/dashboard-v2/dashboard1.component';
import { InboxComponent }  from './inbox/inbox.component';
import { ChatComponent }  from './chat/chat.component';
import { CalendarComponent}  from './calendar/calendar.component';
import { EditorComponent}  from './editor/wysiwyg-editor/editor.component';
import { Ckeditor } from './editor/ckeditor/ckeditor.component';
import { MaterialIconComponent}  from './material-icons/icons.component';
import { ChartComponent }  from './chart/ng2-charts/chart.component';
import { EasyPieChartComponent }  from './chart/easy-pie-chart/easy-pie-chart.component';
import { CardsComponent }   from './components/cards/cards.component';
import { ButtonsComponent }   from './components/buttons/buttons.component';
import { GridListComponent }  from './components/grid-list/gridlist.component';
import { ListOverviewComponent }  from './components/list/list.component';
import { MenuOverviewComponent }  from './components/menu/menu.component';
import { SliderOverviewComponent }  from './components/slider/slider.component';
import { SnackbarOverviewComponent }  from './components/snackbar/snackbar.component';
import { TooltipOverviewComponent }  from './components/tooltip/tooltip.component';
import { DialogOverviewComponent}  from './components/dialog/dialog.component';
import { SelectComponent}  from './components/select/select.component';
import { InputComponent}  from './components/input/input.component';
import { CheckboxComponent}  from './components/checkbox/checkbox.component';
import { RadioComponent}  from './components/radio/radio.component';
import { ToolbarComponent}  from './components/toolbar/toolbar.component';
import { ProgressComponent}  from './components/progress/progress.component';
import { TabsComponent}  from './components/tabs/tabs.component';
import { ColorpickerComponent}  from './components/colorpicker/colorpicker.component';
import { DragulaDemoComponent }  from './drag-and-drop/dragula/dragula.component';
import { SortableDemoComponent }  from './drag-and-drop/sortablejs/sortable.component';
import { FullscreenTableComponent }  from './tables/table-fullscreen/table-fullscreen.component';
import { EditingTableComponent }  from './tables/table-editing/table-editing.component';
import { FilterTableComponent }  from './tables/table-filter/table-filter.component';
import { PagingTableComponent }  from './tables/table-paging/table-paging.component';
import { SortingTableComponent }  from './tables/table-sorting/table-sorting.component';
import { PinningTableComponent }  from './tables/table-pinning/table-pinning.component';
import { SelectionTableComponent }  from './tables/table-selection/table-selection.component';
import { ResponsiveTableComponent }  from './tables/table-responsive/table-responsive.component';
import { FormWizardComponent }  from './forms/form-wizard/formwizard.component';
import { FormValidationComponent }  from './forms/form-validation/formvalidation.component';
import { FormUploadComponent }  from './forms/form-upload/formupload.component';
import { FormTreeComponent }  from './forms/form-tree/formtree.component';
import { GoogleMapComponent}  from './maps/google-map/googlemap.component';
import { LeafletMapComponent}  from './maps/leaflet-map/leafletmap.component';
import { MediaComponent }  from './custom-pages/media/media.component';
import { PricingComponent }  from './custom-pages/pricing/pricing.component';
import { BlankComponent }  from './custom-pages/blank/blank.component';
import { UserProfileComponent }  from './users/user-profile/user-profile.component';
import { UserListComponent }  from './users/user-list/userlist.component';
import { LoginComponent }  from './session/login/login.component';
import { RegisterComponent }  from './session/register/register.component';
import { ForgotPasswordComponent }  from './session/forgot-password/forgot-password.component';
import { LockScreenComponent }  from './session/lockscreen/lockscreen.component';

import { InstitutionRegistrationComponent } from './rf/institution/registration/institution-registration.component';
import { InstitutionListComponent } from './rf/institution/list/institution-list.component';
import { AssetRegistrationComponent } from './rf/asset/registration/asset-registration.component';
import { AssetListComponent } from './rf/asset/list/asset-list.component';
import { IndexerRegistrationComponent } from './rf/indexer/registration/indexer-registration.component';
import { IndexerListComponent } from './rf/indexer/list/indexer-list.component';

const appRoutes: Routes = [
	{	
		path: 'session/login',
		component: LoginComponent,
	},{	
		path: 'session/register',
		component: RegisterComponent,
	},{	
		path: 'session/forgot-password',
		component: ForgotPasswordComponent,
	},{	
		path: 'session/lockscreen',
		component: LockScreenComponent,
	},{
	 	path: '',
	 	component: MainComponent,
	 	children: [
			{ path: 'asset/registration', component: AssetRegistrationComponent },
			{ path: 'asset/edit/:id', component: AssetRegistrationComponent },
			{ path: 'asset/list', component: AssetListComponent },
			{ path: 'institution/registration', component: InstitutionRegistrationComponent },
			{ path: 'institution/edit/:id', component: InstitutionRegistrationComponent },
			{ path: 'institution/list', component: InstitutionListComponent },
			{ path: 'indexer/registration', component: IndexerRegistrationComponent },
			{ path: 'indexer/list', component: IndexerListComponent },
			{ path: 'indexer/edit/:id', component: IndexerRegistrationComponent },
            { path: 'dashboard-v1', component: DashboardComponent },
            { path: 'dashboard/dashboard-v2', component: DashboardOneComponent },
            { path: 'inbox', component: InboxComponent },
            { path: 'chat', component: ChatComponent },
            { path: 'calendar', component: CalendarComponent },
            { path: 'editor/wysiwyg', component: EditorComponent },
            { path: 'editor/ckeditor', component: Ckeditor },
            { path: 'icons', component: MaterialIconComponent },
            { path: 'chart/ng2-charts', component: ChartComponent },
            { path: 'chart/easy-pie-chart', component: EasyPieChartComponent },
			{ path: 'components/buttons', component: ButtonsComponent },
			{ path: 'components/cards', component: CardsComponent },
			{ path: 'components/grid', component: GridListComponent },
			{ path: 'components/list', component: ListOverviewComponent },
			{ path: 'components/menu', component: MenuOverviewComponent },
			{ path: 'components/slider', component: SliderOverviewComponent },
			{ path: 'components/snackbar', component: SnackbarOverviewComponent },
			{ path: 'components/tooltip', component: TooltipOverviewComponent },
			{ path: 'components/dialog', component: DialogOverviewComponent },
			{ path: 'components/select', component: SelectComponent },
			{ path: 'components/input', component: InputComponent },
			{ path: 'components/checkbox', component: CheckboxComponent },
			{ path: 'components/radio', component: RadioComponent },
			{ path: 'components/toolbar', component: ToolbarComponent },
			{ path: 'components/progress', component: ProgressComponent },
			{ path: 'components/tabs', component: TabsComponent },
            { path: 'components/colorpicker', component: ColorpickerComponent },
			{ path: 'dragndrop/dragula', component: DragulaDemoComponent },
			{ path: 'dragndrop/sortable', component: SortableDemoComponent },
            { path: 'tables/fullscreen', component: FullscreenTableComponent },
            { path: 'tables/editing', component: EditingTableComponent },
            { path: 'tables/filter', component: FilterTableComponent },
            { path: 'tables/paging', component: PagingTableComponent },
            { path: 'tables/sorting', component: SortingTableComponent },
            { path: 'tables/pinning', component: PinningTableComponent },
            { path: 'tables/selection', component: SelectionTableComponent },
            { path: 'tables/responsive', component: ResponsiveTableComponent },
            { path: 'forms/form-wizard', component: FormWizardComponent },
			{ path: 'forms/form-validation', component: FormValidationComponent },
            { path: 'forms/form-upload', component: FormUploadComponent },
            { path: 'forms/form-tree', component: FormTreeComponent },		
			{ path: 'maps/googlemap', component: GoogleMapComponent },
			{ path: 'maps/leafletmap', component: LeafletMapComponent },
            { path: 'pages/media', component: MediaComponent },
            { path: 'pages/pricing', component: PricingComponent },
            { path: 'pages/blank', component: BlankComponent },
            { path: 'users/userprofile', component: UserProfileComponent },
            { path: 'users/userlist', component: UserListComponent },
			{ path: '', component: DashboardComponent }
	 	]
  	}
];

@NgModule({
  	imports: [RouterModule.forRoot(appRoutes)],
 	exports: [RouterModule],
  	providers: []
})
export class RoutingModule { }
