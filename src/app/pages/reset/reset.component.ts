import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
resetForm: FormGroup;
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
			this.resetForm = this.formBuilder.group({
				newPassword: ['', Validators.required],
				resetToken: ['', Validators.required]

        });
	}

		get f() { return this.resetForm.controls; }


	onSubmit() {
        this.submitted = true;
		console.log(this.resetForm.value);
        // stop here if form is invalid
		if (this.resetForm.invalid) {
			console.log('Invalid');
            return;
        }

        this.loading = true;
        this.authenticationService.resetPassword(this.resetForm.value)
					.subscribe((res: any) => {
						console.log(res);
						if (res.success === true) {
							this.loading = false;
							this.alertService.success(res.message);
							const returnUrl = this.route.snapshot.queryParams['/app/auth'];
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
