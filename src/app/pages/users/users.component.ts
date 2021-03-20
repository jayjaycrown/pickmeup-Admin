import { Component, OnInit } from '@angular/core';
import { UserService } from "../../_services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	token: any;
	users: any;

	constructor(
		private user: UserService
	) { }

	async ngOnInit(): Promise<void> {
		const user = await JSON.parse(localStorage.getItem("user"));

		// console.log(user);
		this.token = user.token;
		this.fetchVerifiedRiders(this.token);
	}

	fetchVerifiedRiders(token) {
		this.user.fetchUsers(token).subscribe((res: any) => {
			console.log(res);
			this.users = res.users;
			// console.log(res);
			console.log(this.users);

		});
	}

}
