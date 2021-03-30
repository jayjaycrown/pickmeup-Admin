import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { User } from "../_models/user";

@Injectable({ providedIn: "root" })
export class UserService {
	constructor(private http: HttpClient) {}

	getAdminProfile(token: string) {
		return this.http.post<any>(`${environment.apiUrl}/fetch-admin-details.php`, {
				token
			})
			.pipe();
	}

	createState(data) {
		return  this.http.post<any>(`${environment.apiUrl}/create-state.php`, data)
			.pipe();
	}
	fetchState(token) {
			return  this.http.post<any>(`${environment.apiUrl}/fetch-states.php`, {
				token
			})
			.pipe();
	}

	fetchArea(token) {
			return  this.http.post<any>(`${environment.apiUrl}/fetch-areas.php`, {
				token
			})
			.pipe();
	}

	createArea(data) {
		return  this.http.post<any>(`${environment.apiUrl}/create-area.php`, data)
			.pipe();
	}

	fetchStateZones(data) {
			return  this.http.post<any>(`${environment.apiUrl}/fetch-state-zones.php`, data)
			.pipe();
	}
	createStateZone(data) {
		return  this.http.post<any>(`${environment.apiUrl}/create-state-zone.php`, data)
			.pipe();
	}
	fetchSummary(token) {
		return  this.http.post<any>(`${environment.apiUrl}/fetch-summary.php`, {
				token
			})
			.pipe();
	}

	fetchInterstate(token) {
		return  this.http.post<any>(`${environment.apiUrl}/fetch-interstate-pricing.php`, {
				token
			})
			.pipe();
	}

	editInterstate(data) {
		return  this.http.post<any>(`${environment.apiUrl}/edit-interstate-pricing.php`, data)
			.pipe();
	}

	fetchInternational(token) {
		return  this.http.post<any>(`${environment.apiUrl}/fetch-international-zones.php`, {
				token
			})
			.pipe();
	}

	fetchInternationalWeight(token) {
		return  this.http.post<any>(`${environment.apiUrl}/fetch-international-weights.php`, {
				token
			})
			.pipe();
	}
	createInternationalPricing(data) {
		return this.http.post<any>(`${environment.apiUrl}/create-international-zone.php`, data)
			.pipe();
	}

	editInternationalPricing(data) {
		return this.http.post<any>(`${environment.apiUrl}/edit-international-pricing.php`, data)
			.pipe();
	}

	createCountry(data) {
		return this.http.post<any>(`${environment.apiUrl}/create-country.php`, data)
			.pipe();
	}
	fetchCountry(token) {
		return  this.http.post<any>(`${environment.apiUrl}/fetch-countries.php`, {
				token
			})
			.pipe();
	}

	officeInterstateDeliveries(token) {
		return  this.http.post<any>(`${environment.apiUrl}/fetch-office-interstate-deliveries.php`, {
				token
			})
			.pipe();
	}
	addDHLToTracking(data) {
		return  this.http.post<any>(`${environment.apiUrl}/add-dhl-to-interstate-delivery.php`, data)
			.pipe();
	}

	fetchUnverifiedRiders(token) {
		return this.http.post<any>(`${environment.apiUrl}/fetch-unverified-riders.php`, {token})
			.pipe();
	}

	fetchVerifiedRiders(token) {
		return  this.http.post<any>(`${environment.apiUrl}/fetch-verified-riders.php`, {token})
			.pipe();
	}

	verifyRider(data) {
		return  this.http.post<any>(`${environment.apiUrl}/verify-rider.php`, data)
			.pipe();
	}

	unVerifyRider(data) {
		return  this.http.post<any>(`${environment.apiUrl}/unverify-rider.php`, data)
			.pipe();
	}

	fetchUsers(token) {
		return  this.http.post<any>(`${environment.apiUrl}/fetch-users.php`, {token})
			.pipe();
	}
}
