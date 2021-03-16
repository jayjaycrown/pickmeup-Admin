import { Component, OnInit, ElementRef, TemplateRef  } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../_services/admin.service";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	public focus;
	public listTitles: any[];
	public location: Location;
	modalRef: BsModalRef;
  message: string;
	constructor(
		location: Location,
		private element: ElementRef,
		private router: Router,
		private auth: AuthenticationService,
		private modalService: BsModalService
	) {
		this.location = location;
	}

	ngOnInit() {
		this.listTitles = ROUTES.filter(listTitle => listTitle);
	}
	getTitle() {
		let titlee = this.location.prepareExternalUrl(this.location.path());
		if (titlee.charAt(0) === '#') {
			titlee = titlee.slice(1);
		}

		for (let item = 0; item < this.listTitles.length; item++) {
			if (this.listTitles[item].path === titlee) {
				return this.listTitles[item].title;
			}
		}
		return 'Pick Me Up Admin';
	}

	openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
		this.auth.logout();
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

}
