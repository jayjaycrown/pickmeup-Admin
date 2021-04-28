import { Component, OnInit, ElementRef, TemplateRef, OnDestroy } from '@angular/core';
import { UserService } from "../../_services/user.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { AlertService } from '@full-fledged/alerts';
@Component({
  selector: 'app-interstate',
  templateUrl: './interstate.component.html',
  styleUrls: ['./interstate.component.css']
})
export class InterstateComponent implements OnInit {
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
		const user = await JSON.parse(localStorage.getItem("user"));

		// console.log(user);
		this.token = user.token;
		this.fetchOfficeDeliveries();
	}

	fetchOfficeDeliveries() {
		this.user.fetchInterstateRequests(this.token).subscribe((res: any) => {
			// console.log(res);
			this.deliveries = res.deliveries;
		}, err => {
				console.error(err);
		});
	}

	packageArrive( reference) {
		const data = {
			token: this.token,
			deliveryType: 'interstate',
			reference
		}
		// console.log(data);
		this.user.arriveToOffice(data).subscribe((res: any) => {
			// console.log(res);
			if (res.success === true) {
				this.alertService.success(res.message);
				this.fetchOfficeDeliveries();
			} else {
				this.alertService.danger(res.message);
			}
		})
	}
}
