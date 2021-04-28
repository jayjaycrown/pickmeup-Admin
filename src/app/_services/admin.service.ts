import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { User } from "../_models/user";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
	public userSubject: BehaviorSubject<User>;
	public user: Observable<User>;

	constructor(private router: Router, private http: HttpClient) {
		this.userSubject = new BehaviorSubject<User>(
			JSON.parse(localStorage.getItem("user"))
		);
		this.user = this.userSubject.asObservable();
	}

	public get userValue(): User {
		return this.userSubject.value;
	}

	login(email: string, password: string) {
		return this.http
			.post<any>(`${environment.apiUrl}/signin.php`, {
				email,
				password,
			})
			.pipe(
				map((user: any) => {
        const token = (user.token);
        if (token !== undefined) {
          localStorage.setItem("user",  JSON.stringify(user));
        }
        this.userSubject.next(user);
					return user;
			})
		);
	}

	forgotPassword(email) {
		return this.http
			.post<any>(`${environment.apiUrl}/forgot-password.php`, email).pipe();
	}
	resetPassword(value) {
		return this.http
			.post<any>(`${environment.apiUrl}/forgot-password.php`, value).pipe();
	}
	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem("user");
		this.userSubject.next(null);
		this.router.navigate(["/app/auth"]);
	}
}
