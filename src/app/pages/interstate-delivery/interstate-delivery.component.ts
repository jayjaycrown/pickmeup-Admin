import { Component, OnInit, ElementRef, TemplateRef, OnDestroy } from '@angular/core';
import { UserService } from "../../_services/user.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { AlertService } from '@full-fledged/alerts';

@Component({
  selector: 'app-interstate-delivery',
  templateUrl: './interstate-delivery.component.html',
  styleUrls: ['./interstate-delivery.component.css']
})
export class InterstateDeliveryComponent implements OnInit {
	dtOptions: DataTables.Settings = {};
	token: any;
	deliveries: any;
	message: string;
	modalRef: BsModalRef;
	reference: any;
	loading = false;
	model: any = {};
	constructor(
		private user: UserService,
		private modalService: BsModalService,
		private alertService: AlertService
	) { }

	async ngOnInit(): Promise<void> {
			this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
		const user = await JSON.parse(localStorage.getItem("user"));

		// console.log(user);
		this.token = user.token;
		this.fetchOfficeDeliveries(this.token);
	}

	fetchOfficeDeliveries(token) {
		this.user.officeInterstateDeliveries(token).subscribe((res: any) => {
			// console.log(res);
			this.deliveries = res.deliveries;
		}, err => {
				console.error(err);
		});
	}

	decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
	}

	openModal(template: TemplateRef<any>, reference) {
		this.reference = reference;
    this.modalRef = this.modalService.show(template);
	}

	addDHLTracking(tracking) {
		this.loading = true;
		const obj = {
			token: this.token,
			reference: this.reference,
			dhlTrackingNumber: this.model.dhlTrackingNumber
		};
		// console.log(obj);
		this.user.addDHLToTracking(obj).subscribe((res: any) => {
			this.loading = false;
			if (res.success === true) {
				this.alertService.success(res.message);
				this.decline();
				this.fetchOfficeDeliveries(this.token);
			} else {
				this.alertService.danger(res.message);
				this.decline();
			}
		}, err => {
			this.loading = false;
			console.error(err);
		});
	}
}
