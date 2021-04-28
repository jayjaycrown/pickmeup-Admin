import { Component, OnInit, ElementRef, TemplateRef, OnDestroy } from '@angular/core';
import { UserService } from "../../_services/user.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { AlertService } from '@full-fledged/alerts';

import { Subject } from 'rxjs';

// import 'rxjs/add/operator/map';

interface State {
  Id: number;
  Name: string;
  Address: string;
  Budget: string;
	Status: string;

}
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, OnDestroy {
	dtTrigger: Subject<any> = new Subject<any>();

	model: any = {};
	areamodel: any = {};
	modalRef: BsModalRef;
	message: string;
	dtOptions: DataTables.Settings = {};
	loading = false;
	states: any;
	areas: any;
	token: any;
	stateZones: any;
	role: any;
	constructor(
		private element: ElementRef,
		private router: Router,
		private modalService: BsModalService,
		private user: UserService,
		private alertService: AlertService
	) { }

		async ngOnInit() {

		const user = await JSON.parse(localStorage.getItem("user"));

		// console.log(user);
		this.token = user.token;
		// console.log(token);
			this.model = { token: this.token };
			this.areamodel = { token: this.token };

			this.user.getAdminProfile(this.token).subscribe((res: any) => {
			// console.log(res);
			this.role = res.adminDetails.role;
			// alert(this.role);
			})

		this.fetchState(this.token);
		this.fetchArea(this.token);
			// this.fetchStateZone(this.token);
		// setTimeout(() => {
		// 	this.fetchState(token);
		// }, 5000);

		this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
		}

	setState() {
		const data = {
			stateId: this.areamodel.stateId,
			token: this.token
		};
		// console.log(data);
		this.user.fetchStateZones(data).subscribe((res: any) => {
			// console.log(res);
			this.stateZones = res.zones;
		});
	}

	// fetchStateZone(token) {
	// 	this.user.fetchStateZones(token).subscribe((res: any) => {
	// 		console.log(res);
	// 		this.stateZones = res.zones;
	// 	});
	// }
	fetchState(token) {
		this.user.fetchState(token).subscribe((res: any) => {
			// console.log(res);
			// console.log(res.states);
			// console.log(res.states[0]);
			this.states = res.states;
			// console.log(this.states);
			this.dtTrigger.next();
			// if (res.status === true) {
			// // for (let i = 0; i < res.states.length; i++) {
			// // 	console.log(res.states[i]);

			// // }
			// }
		});
	}

	fetchArea(token) {
		this.user.fetchArea(token).subscribe((res: any) => {
			// console.log(res);

			this.areas = res.areas;
			// console.log(this.areas);
			this.dtTrigger.next();
			// if (res.status === true) {
			// // for (let i = 0; i < res.states.length; i++) {
			// // 	console.log(res.states[i]);

			// // }
			// }
		});
	}


	openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
	}

	openArea(area: TemplateRef<any>) {
    this.modalRef = this.modalService.show(area);
  }

  // confirm(): void {
  //   this.modalRef.hide();
  // }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
	}

	onSubmit() {
		this.loading = true;
		// console.log(this.areamodel);
		if (!this.areas.some((item) => item.areaName === this.areamodel.areaName)) {
			this.user.createArea(this.areamodel).subscribe((res: any) => {
			this.loading = false;
			if (res.success  === true) {
				this.alertService.success(res.message);
				this.decline();
				this.fetchArea(this.token);
				// this.fetchArea(this.token);
			} else {
				this.alertService.danger(res.message);
			}
		});

		} else {
			this.alertService.danger('Area Already exists');
			this.loading = false;
		}
			}
	createNewState() {
		this.loading = true;
		// console.log(this.model);
		if (!this.states.some((item) => item.stateName === this.model.stateName.toLowerCase())) {
			this.user.createState(this.model).subscribe((res: any) => {
			this.loading = false;
				if (res.success === true) {
				this.fetchState(this.token);
				this.alertService.success(res.message);
				this.decline();
			} else {
				this.alertService.danger(res.message);
			}
		});

		} else {
			this.alertService.danger('STATE ALREADY EXIST');
			this.loading = false;
		}
	}

	// tslint:disable-next-line: use-life-cycle-interface
	ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
	}


	viewZones(stateID) {
		this.router.navigateByUrl('/app/home/location/' + stateID);
	}

}
