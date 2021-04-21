import { Component, OnInit , ElementRef, TemplateRef} from "@angular/core";
import { AlertService } from "@full-fledged/alerts";
import { UserService } from '../../_services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
	unRiders = [];
	model: any = {};
	unVerifiedRiders: any;
	verifiedRiders: any;
	vRiders = [];
	loading = false;
	vIndex: number;
	unIndex: number;
	details = 'https://pickmeup.com.ng/api/rider/';
	ridersCard;
	stageCarriage;
	vehicleLicense;
	token: any;
	key = 'id';
	reverse = false;
	p = 1;
	newunRiders: any[];
	firstName: string;
	message: string;
	modalRef: BsModalRef;
	riderId: any;
	constructor(
		private user: UserService,
		private alert: AlertService,
		private modalService: BsModalService,
	) {}

	sort(key) {
		this.key = key;
		this.reverse = !this.reverse;
	}

	search() {
		this.newunRiders = this.unVerifiedRiders;
		if (this.firstName === '') {
			this.newunRiders = this.unVerifiedRiders;
			// this.ngOnInit();
		} else {
			this.newunRiders = this.newunRiders.filter(res => {
				const testing: string = res.firstName;
				return testing.toLowerCase().match(this.firstName.toLowerCase());
			});
		}
	}

	async ngOnInit(): Promise<void> {
		const user = await JSON.parse(localStorage.getItem("user"));

		// console.log(user);
		this.token = user.token;
		this.dtOptions = {
			pagingType: "full_numbers",
			pageLength: 5,
		};
		// console.log(token);
		this.fetchUnverifiedRiders(this.token);
		this.fetchVerifiedRiders(this.token);
	}

	fetchUnverifiedRiders(token) {
		this.newunRiders = [];
		this.user.fetchUnverifiedRiders(token).subscribe((res: any) => {
			this.unVerifiedRiders = res.riders;
			// console.log(this.unVerifiedRiders);
				this.newunRiders = this.unVerifiedRiders;

		});
	}

	fetchVerifiedRiders(token) {
		this.vRiders = [];
		this.user.fetchVerifiedRiders(token).subscribe((res: any) => {
			console.log(res);
			this.verifiedRiders = res.riders;
			// console.log(res);
			for (let i = 0; i < res.riders.length; i++) {

				const element = res.riders[i];
				this.vRiders.push(element);

			}
			// console.log(this.vRiders);
		});
	}

	close(riderId) {
		const obj = {
			token: this.token,
			riderId: riderId
		};
		this.user.unVerifyRider(obj).subscribe((res: any) => {
			console.log(res);
			this.alert.success(res.message);
			this.fetchVerifiedRiders(this.token);
			this.fetchUnverifiedRiders(this.token);
		});

	}

		decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
	}

	openModal(template: TemplateRef<any>, reference) {
		// this.reference = reference;
    this.modalRef = this.modalService.show(template);
	}

	payRider(template: TemplateRef<any>, riderId) {
		this.riderId = riderId;
		this.modalRef = this.modalService.show(template);
		// console.log(riderId);
	}

	MakePayment() {
		this.loading = true;
		const obj = {
			riderId: this.riderId,
			token: this.token,
			amount: this.model.amount
		}
		console.log(obj);
		this.user.payRider(obj).subscribe((res: any) => {
			console.log(res)
			if (res.success === true  ) {
					this.alert.success(res.message)
			} else {
					this.alert.danger(res.message)
			}
			this.loading = false;
			this.decline();
		})


	}
}

