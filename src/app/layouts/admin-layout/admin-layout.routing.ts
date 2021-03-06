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
import { LocationComponent } from '../../pages/location/location.component';
import { UsersComponent } from '../../pages/users/users.component';
import { UserDetailsComponent } from '../../pages/users/user-details/user-details.component';
import { ZonesComponent } from '../../pages/zones/zones.component';
import { InterstateLocationComponent } from '../../pages/interstate-location/interstate-location.component';
import { InternationalPricingComponent } from '../../pages/international-pricing/international-pricing.component';
import { InterstateDeliveryComponent } from '../../pages/interstate-delivery/interstate-delivery.component';
import { InternationalDeliveryComponent } from '../../pages/international-delivery/international-delivery.component';
import { AssignComponent } from '../../pages/assign/assign.component';
import { InterstateComponent } from '../../pages/interstate/interstate.component';
import { InternationalComponent } from '../../pages/international/international.component';
import { BroadcastNotificationsComponent } from "../../pages/broadcast-notifications/broadcast-notifications.component";

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
	{ path: "notifications", component: BroadcastNotificationsComponent },
	{ path: "inbox", component: InboxComponent },
	{ path: "riders", component: RidersComponent },
	{ path: "riders/:id", component: RidersDetailsComponent },
	{ path: 'location', component: LocationComponent },
	{ path: 'location/:id', component: ZonesComponent },
	{ path: 'users', component: UsersComponent },
	{ path: 'users/:id', component: UserDetailsComponent },
	{ path: 'interstatePricing', component: InterstateLocationComponent },
	{ path: 'interstate', component: InterstateComponent},
	{ path: 'internationalPricing', component: InternationalPricingComponent },
	{ path: 'interstateDelivery', component: InterstateDeliveryComponent },
	{ path: 'internationalDelivery', component: InternationalDeliveryComponent },
	{ path: 'international', component: InternationalComponent},
	{ path: 'assign', component: AssignComponent }
];
