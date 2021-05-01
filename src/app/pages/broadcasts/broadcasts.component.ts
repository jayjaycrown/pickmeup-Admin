import { Component, OnInit } from '@angular/core';
import { AlertService } from '@full-fledged/alerts';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-broadcasts',
  templateUrl: './broadcasts.component.html',
  styleUrls: ['./broadcasts.component.css']
})
export class BroadcastsComponent implements OnInit {
	token: any;
	model: any = {};
	loading = false;

	constructor(
		private user: UserService,
		private alert: AlertService
	) { }

	async ngOnInit(): Promise<void> {
			const user = await JSON.parse(localStorage.getItem("user"));
		this.token = user.token;
	}

	testEscape(s: string) {
    return ('' + s)
        .replace(/\\/g, '\\\\')
        .replace(/\t/g, '\\t')
        // .replace(/\n/g, '\\n')
        .replace(/\u00A0/g, '\\u00A0')
        .replace(/&/g, '\\x26')
        .replace(/'/g, '\\x27')
        .replace(/"/g, '\\x22')
        .replace(/</g, '\\x3C')
        .replace(/>/g, '\\x3E');
}

	onSubmit() {
		this.loading = true;
		// console.log(this.model);
		const test: string = this.testEscape(this.model.message)
		// const str: string =  this.model.message
		const split: string[] = test.split('\n');
		// console.log(split);
		const obj = {
			token: this.token,
			heading: this.model.heading,
			messageArray: split
		}
		// console.log(obj);
		this.user.sendBroadcastMessage(obj).subscribe((res: any) => {
			console.log(res);
				this.loading = false;
			if (res.success === true) {
				this.alert.success(res.message);
			} else {
				this.alert.danger(res.message);
			}
		})
	}


}
