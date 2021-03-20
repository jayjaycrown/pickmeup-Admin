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
		return  this.http.post<any>(`${environment.apiUrl}/create-state.php`, data)
			.pipe();
	}
	fetchSummary(token) {
		return  this.http.post<any>(`${environment.apiUrl}/fetch-summary.php`, {
				token
			})
			.pipe();
	}

	fetchUnverifiedRiders(token) {
		return  this.http.post<any>(`${environment.apiUrl}/fetch-unverified-riders.php`, {token})
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
