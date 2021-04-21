import { Component, OnInit } from "@angular/core";
import { UserService } from "../../_services/user.service";
import { User } from "../../_models/user";
@Component({
	selector: "app-user-profile",
	templateUrl: "./user-profile.component.html",
	styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
	adminDetails:  User;
	constructor(
		private user: UserService
	) {}

	async ngOnInit() {
		const user = await JSON.parse(localStorage.getItem("user"));
		// console.log(user);
		const token = user.token;
		// console.log(token);
		this.user.getAdminProfile(token).subscribe((res: any) => {
			// console.log(res);
			this.adminDetails = res.adminDetails;
			// console.log(this.adminDetails);
		});
	}

	onClick() {}
}
