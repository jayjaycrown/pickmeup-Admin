import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
interface Requests {
	Id: number;
	Name: string;
	Address: string;
	Budget: string;
	Status: string;
}
@Component({
	selector: "app-requests",
	templateUrl: "./requests.component.html",
	styleUrls: ["./requests.component.css"],
})
export class RequestsComponent implements OnInit {
	constructor(
		private router: Router
	) {}

	dtOptions: DataTables.Settings = {};
	person: Requests[] = [
		{
			Id: 1,
			Name: "Jonathan",
			Address: "Lagos, Nigeria",
			Budget: "$820,000",
			Status: "Pending",
		},
		{
			Id: 2,
			Name: "Crown",
			Address: "Ogun, Nigeria",
			Budget: "$102,000",
			Status: "Verified",
		},
		{
			Id: 3,
			Name: "Tessal",
			Address: "Ibadan, Nigeria",
			Budget: "$112,000",
			Status: "Canceled",
		},
		{
			Id: 4,
			Name: "Ola",
			Address: "PHC, Nigeria",
			Budget: "$312,000",
			Status: "Pending",
		},
		{
			Id: 5,
			Name: "Gary",
			Address: "Houston, Texas",
			Budget: "$712,000",
			Status: "Verified",
		},
		{
			Id: 6,
			Name: "Testing",
			Address: "Mumbai, India",
			Budget: "$212,000",
			Status: "On Hold",
		},
		{
			Id: 7,
			Name: "Kodehead",
			Address: "Ontario, Canada",
			Budget: "$129,000",
			Status: "Canceled",
		},
	];
	ngOnInit(): void {
		this.dtOptions = {
			pagingType: "full_numbers",
			pageLength: 5,
		};
	}

	onViewRequest(id) {
		this.router.navigateByUrl('/request/' + id);
	}
}
