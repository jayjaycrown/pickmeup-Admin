import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

	forgotForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
	constructor(
		private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
		private authenticationService: AuthenticationService,
				private alertService: AlertService
	) {
		if (this.authenticationService.userValue) {
            this.router.navigate(['app/home']);
        }
	}

	ngOnInit(): void {
			this.forgotForm = this.formBuilder.group({
            email: ['', Validators.required]

        });
	}

		get f() { return this.forgotForm.controls; }


	onSubmit() {
        this.submitted = true;
		console.log(this.forgotForm.value);
        // stop here if form is invalid
        if (this.forgotForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.forgotPassword(this.forgotForm.value)
					.subscribe((res: any) => {
						console.log(res);
						if (res.success === true) {
							this.loading = false;
							this.alertService.success(res.message);
							const returnUrl = this.route.snapshot.queryParams['/app/auth/reset'];
                    this.router.navigateByUrl(returnUrl);
						} else {
							this.alertService.danger(res.message);
							this.error = JSON.stringify(res.message);
							this.loading = false;
						}
					},
						err => {
							this.error = err;
              this.loading = false;
						});
    }

}
