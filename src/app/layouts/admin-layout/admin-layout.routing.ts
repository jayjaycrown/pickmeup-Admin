import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { FontsComponent } from "../../pages/fonts/fonts.component";
import { RequestsComponent } from "../../pages/requests/requests.component";
import { BroadcastsComponent } from "../../pages/broadcasts/broadcasts.component";
import { InboxComponent } from "../../pages/inbox/inbox.component";
import { RidersComponent } from "../../pages/riders/riders.component";
import { RequestDetailsComponent } from "../../pages/requests/request-details/request-details.component";
import { RidersDetailsComponent } from "../../pages/riders/riders-details/riders-details.component";

export const AdminLayoutRoutes: Routes = [
		{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
	{ path: "dashboard", component: DashboardComponent },
	{ path: "user-profile", component: UserProfileComponent },
	{ path: "tables", component: TablesComponent },
	{ path: "icons", component: IconsComponent },
	{ path: "maps", component: MapsComponent },
	{ path: "fonts", component: FontsComponent },
	{ path: "requests", component: RequestsComponent },
	{ path: "requests/:id", component: RequestDetailsComponent },
	{ path: "broadcasts", component: BroadcastsComponent },
	{ path: "inbox", component: InboxComponent },
	{ path: "riders", component: RidersComponent },
	{ path: "riders/:id", component: RidersDetailsComponent },
];
