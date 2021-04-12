import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
		loginForm: FormGroup;
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

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
	}

	get f() { return this.loginForm.controls; }


	onSubmit() {
    this.submitted = true;
		console.log(this.f.value);
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
					.subscribe((res: any) => {
						if (res.success === true) {
							this.loading = false;
							this.alertService.success('Login Successfull');
							const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/app/home';
                    this.router.navigateByUrl(returnUrl);
						} else {
							this.alertService.danger(res.message);
							this.error = res.message;
							this.loading = false;
						}
					},
						err => {
							this.error = err;
              this.loading = false;
						});
    }

}
