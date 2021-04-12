import { Component, OnInit, ElementRef, TemplateRef, OnDestroy } from '@angular/core';
import { UserService } from "../../_services/user.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { AlertService } from '@full-fledged/alerts';

@Component({
  selector: 'app-international-pricing',
  templateUrl: './international-pricing.component.html',
  styleUrls: ['./international-pricing.component.css']
})
export class InternationalPricingComponent implements OnInit {

	dtOptions: DataTables.Settings = {};
	token: any;
	zones: any;
	interWeight: any;
	message: string;
	interId: any;
	modalRef: BsModalRef;
	model: any = {};
	editmodel: any = {};
	countrymodel: any = {};
	loading = false;
	zone: any;
	pricing: any = {};
	price: any = {};
	myZone: any;
	countries: any;
	p = 1;
	key = 'id';
	reverse = false;
	newcountries: any;
	countryName: string;
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
		this.fetchInternational(this.token);
		this.fetchInternationalWeight(this.token);
		this.fetchCountries(this.token);
	}
	fetchInternational(token) {
		this.user.fetchInternational(token).subscribe((res: any) => {
			console.log(res);
			this.zones = res.zones;
		});
	}

	fetchInternationalWeight(token) {
		this.user.fetchInternationalWeight(token).subscribe((res: any) => {
			this.interWeight = res.zones;
		});
	}

	fetchCountries(token) {
		this.user.fetchCountry(token).subscribe((res: any) => {

			this.countries = res.countries;
			this.newcountries = this.countries;
		});
	}

	decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
	}

	openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
	}

	onClick(editPrice: TemplateRef<any>, item) {
		this.myZone = item;
		// alert(this.myZone);
		this.modalRef = this.modalService.show(editPrice);
	}

	addInterPrice(editForm: NgForm) {
		this.pricing = { ...this.price, ...editForm };
		console.log(this.pricing);
		this.decline();

	}

	addInter() {
		this.loading = true;
		const obj = {
			token: this.token,
			zone: this.model.zone,
			pricing: this.pricing
		};
		console.log(obj);
		this.user.createInternationalPricing(obj).subscribe((res: any) => {
			this.loading = false;
			console.log(res);
			if (res.success === true) {
				this.alertService.success(res.message);
				this.model.length = 0;
				this.fetchInternational(this.token);
			} else {
				this.alertService.danger(res.message);
				// this.model = {};
			}
		});
	}

	editInterPrice() {
		this.loading = true;
		this.editmodel = {
			token: this.token,
			zone: this.myZone,
			rangeId: this.editmodel.rangeId,
			price: this.editmodel.price
		};
		console.log(this.editmodel);
		this.user.editInternationalPricing(this.editmodel).subscribe((res: any) => {
			console.log(res);
			this.loading = false;
			if (res.success === true) {
				this.alertService.success(res.message);
				this.decline();
			} else {
				this.alertService.danger(res.message);
				this.decline();
			}
		});
	}

	addCountry() {
		this.loading = true;
		this.countrymodel = {
			token: this.token,
			zone: this.countrymodel.zone,
			countryName: this.countrymodel.countryName
		};
		// console.log(this.countrymodel);
		this.user.createCountry(this.countrymodel).subscribe((res: any) => {
			console.log(res);
			this.countrymodel.length = 0;
			this.loading = false;
			if (res.success === true) {
				this.alertService.success(res.message);
			} else {
				this.alertService.danger(res.message);
			}
		}, err => {
				console.error(err);
		});

	}


	search() {
		this.newcountries = this.countries;
		if (this.countryName === '') {
			this.newcountries = this.countries;
			// this.ngOnInit();
		} else {
			this.newcountries = this.newcountries.filter(res => {
				return res.countryName.toLowerCase().match(this.countryName.toLowerCase());
			});
		}
	}
}

