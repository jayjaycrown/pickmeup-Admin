import { Component, OnInit } from "@angular/core";

interface Person {
	Id: number;
	Name: string;
	Address: string;
	Budget: string;
	Status: string;
}
@Component({
	selector: "app-riders",
	templateUrl: "./riders.component.html",
	styleUrls: ["./riders.component.css"],
})
export class RidersComponent implements OnInit {
	dtOptions: DataTables.Settings = {};
	person: Person[] = [
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
	constructor() {}

	ngOnInit(): void {
		this.dtOptions = {
			pagingType: "full_numbers",
			pageLength: 5,
		};
	}
}
