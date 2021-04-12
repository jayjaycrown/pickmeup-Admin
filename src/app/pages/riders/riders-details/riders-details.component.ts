import { Component, OnInit } from '@angular/core';
import { AlertService } from "@full-fledged/alerts";
import { UserService } from '../../../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-riders-details',
  templateUrl: './riders-details.component.html',
  styleUrls: ['./riders-details.component.css']
})
export class RidersDetailsComponent implements OnInit {

		unRiders: any = {};
	unVerifiedRiders: any;
	id;
	ridersCard;
	vehicleLicense;
	stageCarriage;
	token: any;
	riderType = '';
	constructor(
		private user: UserService,
		private alertService: AlertService,
		private route: ActivatedRoute,
		private router: Router,
		private alert: AlertService
	) { }

	async ngOnInit(): Promise<void> {
		this.id = this.route.snapshot.paramMap.get('id');
		// alert(this.id);
		const user = await JSON.parse(localStorage.getItem("user"));
		this.token = user.token;
		this.fetchUnverifiedRiders(this.token);
		// this.fetchVerifiedRiders(this.token);
	}
	fetchUnverifiedRiders(token) {
		this.user.fetchUnverifiedRiders(token).subscribe((res: any) => {
			this.unVerifiedRiders = res.riders;
			// console.log(res);
			for (let i = 0; i < res.riders.length; i++) {
				if (res.riders[i].riderId === this.id) {
					this.unRiders = this.unVerifiedRiders[i];
					this.stageCarriage = `https://pickmeup.com.ng/api/rider/${this.unRiders.stageCarriage}`;
					this.vehicleLicense = `https://pickmeup.com.ng/api/rider/${this.unRiders.vehicleLicense}`;
					this.ridersCard = `https://pickmeup.com.ng/api/rider/${this.unRiders.ridersCard}`;
					// this.unRiders.push(element);
				}
				// console.log(this.unRiders);
				// const element = this.unVerifiedRiders[i];
				// this.unRiders.push(element);

			}
			// console.log(this.unRiders);
		});
	}

	// fetchVerifiedRiders(token) {
	// 	this.user.fetchVerifiedRiders(token).subscribe((res: any) => {
	// 		this.unVerifiedRiders = res.riders;
	// 		// console.log(res);
	// 		for (let i = 0; i < res.riders.length; i++) {
	// 			if (res.riders[i].riderId === this.id) {
	// 				this.unRiders = this.unVerifiedRiders[i];
	// 				this.stageCarriage = `https://pickmeup.com.ng/api/rider/${this.unRiders.stageCarriage}`;
	// 				this.vehicleLicense = `https://pickmeup.com.ng/api/rider/${this.unRiders.vehicleLicense}`;
	// 				this.ridersCard = `https://pickmeup.com.ng/api/rider/${this.unRiders.ridersCard}`;
	// 				// this.unRiders.push(element);
	// 			}

	// 			// const element = this.unVerifiedRiders[i];
	// 			// this.unRiders.push(element);

	// 		}
	// 		// console.log(this.unRiders);
	// 	});
	// }

	close() {
		this.router.navigateByUrl('/app/home/riders');
	}
	accept(riderId) {
		const obj = {
			riderId: riderId,
			token: this.token,
			riderType : this.riderType
		};
		this.user.verifyRider(obj).subscribe((res: any) => {
			// console.log(res);
			if (res.success === true) {
				this.alert.success(res.message);
				setTimeout(() => {
					this.router.navigate(['/app/home/riders']);
				}, 3000);
			} else {
				this.alert.danger(res.message);
			}
		});
	}

	change(riderType) {
		console.log(riderType);
		this.riderType = riderType;
	}

}
