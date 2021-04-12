import { Component, ElementRef, TemplateRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthenticationService } from "src/app/_services/admin.service";

declare interface RouteInfo {
	path: string;
	title: string;
	icon: string;
	class: string;
}
export const ROUTES: RouteInfo[] = [
	{
		path: "dashboard",
		title: "Dashboard",
		icon: "ni-tv-2 text-custom",
		class: "",
	},
	{
		path: "location",
		title: "Location",
		icon: "ni-pin-3 text-custom",
		class: "",
	},
	{
		path: "interstate",
		title: "Interstate Pricing",
		icon: "ni-pin-3 text-custom",
		class: "",
	},
	{
		path: "interstateDelivery",
		title: "Interstate Tracking",
		icon: "ni-pin-3 text-custom",
		class: "",
	},
	{
		path: "international",
		title: "International Pricing",
		icon: "ni-pin-3 text-custom",
		class: "",
	},
	{
		path: "internationalDelivery",
		title: "International tracking",
		icon: "ni-pin-3 text-custom",
		class: "",
	},
	// {
	// 	path: "zones",
	// 	title: "Zones",
	// 	icon: "ni-pin-3 text-custom",
	// 	class: "",
	// },
	// { path: 'icons', title: 'Icons',  icon: 'ni-planet text-custom', class: '' },
	// { path: '/maps', title: 'Maps',  icon: 'ni-pin-3 text-orange', class: '' },
	{
		path: "riders",
		title: "Riders",
		icon: "ni-circle-08 text-custom",
		class: "",
	},
	{ path: 'users', title: 'Users',  icon: 'ni-circle-08 text-custom', class: '' },
	{
		path: "user-profile",
		title: "User profile",
		icon: "ni-single-02 text-custom",
		class: "",
	},
	{
		path: "assign",
		title: "Requests",
		icon: "ni-circle-08 text-custom",
		class: "",
	},
	{
		path: "broadcasts",
		title: "Broadcasts",
		icon: "ni-circle-08 text-custom",
		class: "",
	},
	{
		path: "inbox",
		title: "Inbox",
		icon: "ni-circle-08 text-custom",
		class: "",
	},
	// { path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-custom', class: '' },
	// { path: '/fonts', title: 'Fonts',  icon: 'ni-pin-3 text-custom', class: '' },
	// { path: '/login', title: 'Login',  icon: 'ni-key-25 text-custom', class: '' },
	// { path: '/register', title: 'Register', icon: 'ni-circle-08 text-custom', class: '' }
];

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
		modalRef: BsModalRef;
	public menuItems: any[];
	public isCollapsed = true;
	message: string;

	constructor(
		private element: ElementRef,
		private router: Router,
		private auth: AuthenticationService,
		private modalService: BsModalService
	) {}

	ngOnInit() {
		this.menuItems = ROUTES.filter((menuItem) => menuItem);
		this.router.events.subscribe((event) => {
			this.isCollapsed = true;
		});
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
