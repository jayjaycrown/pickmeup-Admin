import { Component, OnInit, ElementRef, TemplateRef, OnDestroy } from '@angular/core';
import { UserService } from "../../_services/user.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { AlertService } from '@full-fledged/alerts';
// import { timeStamp } from 'console';

@Component({
  selector: 'app-interstate-location',
  templateUrl: './interstate-location.component.html',
  styleUrls: ['./interstate-location.component.css']
})
export class InterstateLocationComponent implements OnInit {
	token: any;
	prices: any;
	dtOptions: DataTables.Settings = {};
	modalRef: BsModalRef;
	interId: any;
	model: any = {};
	loading = false;
	message: string;
	southWestPrice: any;
	newPrice: any;
	key = 'id';
	reverse = false;
	p = 1;
	constructor(
		private user: UserService,
		private modalService: BsModalService,
		private alertService: AlertService
	) { }

	sort(key) {
		this.key = key;
		this.reverse = !this.reverse;
	}

	async ngOnInit(): Promise<void> {
		this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
		const user = await JSON.parse(localStorage.getItem("user"));

		// console.log(user);
		this.token = user.token;
		this.model = { token: this.token };
		this.fetchInterPrice(this.token);
		// console.log(token);
	}

	fetchInterPrice(token) {
		this.user.fetchInterstate(token).subscribe((res: any) => {
			console.log(res);
			this.prices = res.prices;
			this.newPrice = this.prices;
		});
	}

	editPrice() {
		this.loading = true;
		this.model = {
			token: this.token,
			id: this.interId,
			southWestPrice: this.model.southWestPrice,
			otherPrice: this.model.otherPrice
		};
		console.log(this.model);
		this.user.editInterstate(this.model).subscribe((res: any) => {
			console.log(res);
			if (res.success === true) {
				this.alertService.success(res.message);
				this.loading = false;
				this.fetchInterPrice(this.token);
				this.decline();
			} else {
				this.alertService.danger(res.message);
				this.decline();
				this.loading = false;
			}

		});
	}

	decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
	}

	openModal(template: TemplateRef<any>, id) {
		this.interId = id;
    this.modalRef = this.modalService.show(template);
	}

	search() {
		this.newPrice = this.prices;
		if (this.southWestPrice === '') {
			this.newPrice = this.prices;
			// this.ngOnInit();
		} else {
			this.newPrice = this.newPrice.filter(res => {
				return res.southWestPrice.match(this.southWestPrice);
			});
		}
	}

}
