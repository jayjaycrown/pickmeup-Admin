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
	modalRef: BsModalRef;
	message: string;
	dtOptions: DataTables.Settings = {};
	loading = false;
	states: any;
	areas: any;
	constructor(
		private element: ElementRef,
		private router: Router,
		private modalService: BsModalService,
		private user: UserService,
		private alertService: AlertService
	) { }

	fetchState(token) {
		this.user.fetchState(token).subscribe((res: any) => {
			console.log(res);
			// console.log(res.states);
			// console.log(res.states[0]);
			this.states = res.states;
			console.log(this.states);
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
			console.log(res);

			this.areas = res.areas;
			console.log(this.areas);
			this.dtTrigger.next();
			// if (res.status === true) {
			// // for (let i = 0; i < res.states.length; i++) {
			// // 	console.log(res.states[i]);

			// // }
			// }
		});
	}
	async ngOnInit() {

		const user = await JSON.parse(localStorage.getItem("user"));

		// console.log(user);
		const token = user.token;
		// console.log(token);
		this.model = { token: token };
		this.fetchState(token);
		this.fetchArea(token);
		// setTimeout(() => {
		// 	this.fetchState(token);
		// }, 5000);

		this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
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
		console.log(this.model);
		this.user.createArea(this.model).subscribe((res: any) => {
			this.loading = false;
			if (res.success  === true) {
				this.alertService.success(res.message);
				this.decline();
			} else {
				this.alertService.danger(res.message);
			}
		});
	}

	// tslint:disable-next-line: use-life-cycle-interface
	ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
