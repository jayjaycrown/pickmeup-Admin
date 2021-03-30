import { Component, OnInit, ElementRef, TemplateRef, OnDestroy } from '@angular/core';
import { UserService } from "../../_services/user.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { AlertService } from '@full-fledged/alerts';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {

		dtTrigger: Subject<any> = new Subject<any>();

	model: any = {};
	pricemodel: any = {};
	modalRef: BsModalRef;
	message: string;
	dtOptions: DataTables.Settings = {};
	loading = false;
	zones: any;
	token: any;
	id: any;
	pricing: any = {};
	zone: any = 'test';
	checkzone: any;
	price: any = {};
	constructor(
		private element: ElementRef,
		private router: Router,
		private modalService: BsModalService,
		private user: UserService,
		private alertService: AlertService,
		private route: ActivatedRoute,
	) { }

	async ngOnInit() {
		this.id = this.route.snapshot.paramMap.get('id');
		const user = await JSON.parse(localStorage.getItem("user"));
		this.token = user.token;
		// console.log(token);
		this.model = { token: this.token, stateId: this.id };
		this.fetchStateZone(this.model);

		this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
	}

	fetchStateZone(model) {
		this.user.fetchStateZones(model).subscribe((res: any) => {
			console.log(res);
			// console.log(res.states);
			// console.log(res.states[0]);
			this.zones = res.zones;
			console.log(this.zones);
			this.dtTrigger.next();
			// if (res.status === true) {
			// // for (let i = 0; i < res.states.length; i++) {
			// // 	console.log(res.states[i]);

			// // }
			// }
		});
	}

	addPrice(template: TemplateRef<any>, zone: any) {
		this.checkzone = zone.toLowerCase();
		console.log(this.zone);
		// alert(this.zone);
    this.modalRef = this.modalService.show(template);
	}
	decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
	}

	AddNewPrice(addnewPrice) {
		this.pricing = { ...this.price, ...addnewPrice };
		// this.pricing = addnewPrice;
		console.log(this.pricing);
		this.decline();
	}


	onSubmit() {
		this.loading = true;
		let zone = this.model.zone;
		zone = zone.toLowerCase();
		this.model = { pricing: this.pricing , token: this.token, zone: zone, stateId: this.id};
		console.log(this.model);
		this.user.createStateZone(this.model).subscribe((res: any) => {
			this.loading = false;
			console.log(res);
			this.alertService.success(res.message);
		});
	}

}
