import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../_services/admin.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanLoad {
	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) { }

	returnUrl = location.pathname;
	canLoad(route: Route, segments: UrlSegment[]) {
		const user = this.authenticationService.userValue;
		if (user) {
			return true;
		}

		// not logged in so redirect to login page with the return url
		this.router.navigate(["/app/auth"], { queryParams: { returnUrl: this.returnUrl } });
		return false;
	}
}

// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
// 		const user = this.authenticationService.userValue;
// 		if (user) {
// 			// check if route is restricted by role
// 			// if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
// 			// 	// role not authorised so redirect to home page
// 			// 	this.router.navigate(["/"]);
// 			// 	return false;
// 			// }

// 			// authorised so return true
// 			return true;
// 		}

// 		// not logged in so redirect to login page with the return url
// 		this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
// 		return false;
// 	}
