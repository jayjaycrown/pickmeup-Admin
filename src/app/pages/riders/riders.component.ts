import { Component, OnInit } from "@angular/core";
import { AlertService } from "@full-fledged/alerts";
import { UserService } from '../../_services/user.service';

interface Person {
	Id: number;
	Name: string;
	Address: string;
	Budget: string;
	Status: string;
}
@Component({
	selector: "app-riders",
	templateUrl: "./riders.component.html",
	styleUrls: ["./riders.component.css"],
})
export class RidersComponent implements OnInit {
	dtOptions: DataTables.Settings = {};
	unRiders = [];
	unVerifiedRiders: any;
	verifiedRiders: any;
	vRiders = [];
	vIndex: number;
	unIndex: number;
	details = 'https://pickmeup.com.ng/api/rider/';
	ridersCard;
	stageCarriage;
	vehicleLicense;
	token: any;
	key = 'id';
	reverse = false;
	p = 1;
	newunRiders: any[];
	firstName: string;
	constructor(
		private user: UserService,
		private alert: AlertService
	) {}

	sort(key) {
		this.key = key;
		this.reverse = !this.reverse;
	}

	search() {
		this.newunRiders = this.unVerifiedRiders;
		if (this.firstName === '') {
			this.newunRiders = this.unVerifiedRiders;
			// this.ngOnInit();
		} else {
			this.newunRiders = this.newunRiders.filter(res => {
				const testing: string = res.firstName;
				return testing.toLowerCase().match(this.firstName.toLowerCase());
			});
		}
	}

	async ngOnInit(): Promise<void> {
		const user = await JSON.parse(localStorage.getItem("user"));

		// console.log(user);
		this.token = user.token;
		this.dtOptions = {
			pagingType: "full_numbers",
			pageLength: 5,
		};
		// console.log(token);
		this.fetchUnverifiedRiders(this.token);
		this.fetchVerifiedRiders(this.token);
	}

	fetchUnverifiedRiders(token) {
		this.user.fetchUnverifiedRiders(token).subscribe((res: any) => {
			this.unVerifiedRiders = res.riders;
			// console.log(this.unVerifiedRiders);
				this.newunRiders = this.unVerifiedRiders;

		});
	}

	fetchVerifiedRiders(token) {
		this.user.fetchVerifiedRiders(token).subscribe((res: any) => {
			console.log(res);
			this.verifiedRiders = res.riders;
			// console.log(res);
			for (let i = 0; i < res.riders.length; i++) {

				const element = res.riders[i];
				this.vRiders.push(element);

			}
			// console.log(this.vRiders);
		});
	}

	close(riderId) {
		const obj = {
			token: this.token,
			riderId: riderId
		};
		this.user.unVerifyRider(obj).subscribe((res: any) => {
			console.log(res);
			this.alert.success(res.message);
			this.fetchVerifiedRiders(this.token);
			this.fetchUnverifiedRiders(this.token);
		});

	}
}

