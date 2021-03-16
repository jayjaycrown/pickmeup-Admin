import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ClipboardModule } from "ngx-clipboard";
import { DataTablesModule } from "angular-datatables";
import { NgScrollbarModule } from "ngx-scrollbar";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { RequestsComponent } from "../../pages/requests/requests.component";
import { BroadcastsComponent } from "../../pages/broadcasts/broadcasts.component";
import { InboxComponent } from "../../pages/inbox/inbox.component";
import { RidersComponent } from "../../pages/riders/riders.component";
import { RidersDetailsComponent } from "../../pages/riders/riders-details/riders-details.component";
import { RequestDetailsComponent } from "../../pages/requests/request-details/request-details.component";
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(AdminLayoutRoutes),
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		NgbModule,
		NgScrollbarModule,
		ClipboardModule,
		DataTablesModule,
		PerfectScrollbarModule,
	],
	declarations: [
		DashboardComponent,
		UserProfileComponent,
		TablesComponent,
		IconsComponent,
		MapsComponent,
		RequestsComponent,
		RequestDetailsComponent,
		RidersComponent,
		BroadcastsComponent,
		InboxComponent,
		RidersDetailsComponent,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminLayoutModule {}
