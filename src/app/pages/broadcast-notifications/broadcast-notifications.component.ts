import { Component, OnInit } from '@angular/core';
import { AlertService } from '@full-fledged/alerts';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-broadcast-notifications',
  templateUrl: './broadcast-notifications.component.html',
  styleUrls: ['./broadcast-notifications.component.css']
})
export class BroadcastNotificationsComponent implements OnInit {

	token: any;
	model: any = {};
	loading = false;
	constructor(
		private user: UserService,
		private alert: AlertService
	) { }

	async ngOnInit() {
			const user = await JSON.parse(localStorage.getItem("user"));
		this.token = user.token;
	}

	onSubmit() {
		this.loading = true;
		const obj = {
			token: this.token,
			heading: this.model.heading,
			message: this.model.message
		}
		console.log(obj);

		this.user.sendBroadcastNotifications(obj).subscribe((res: any) => {
			console.log(res);
				this.loading = false;
			if (res.success === true) {
				this.alert.success(res.message);
			} else {
				this.alert.danger(res.message);
			}
		})
	}

}
