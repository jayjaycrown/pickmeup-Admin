import { Routes } from "@angular/router";
import { ForgotComponent } from "../../pages/forgot/forgot.component";
import { ResetComponent } from "../../pages/reset/reset.component";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";

export const AuthLayoutRoutes: Routes = [
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	{ path: "", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
	{path: 'forgot', component: ForgotComponent},
	{path: 'reset', component: ResetComponent}
];
