import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
	{
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
	{
		path: "app",
		children: [
			{
				path: '',
				redirectTo: "auth",
				pathMatch: 'full'
			},
			{
				path: "home",
				component: AdminLayoutComponent,
				loadChildren:
					"./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
        canLoad: [AuthGuard]
			},
			{
				path: "auth",
				loadChildren:
					"./layouts/auth-layout/auth-layout.module#AuthLayoutModule",
				// canLoad: [AutoLoginGuard]
			}
		],
	},
	{
		path: "**",
		redirectTo: "auth",
	},
];

@NgModule({
	imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
	exports: [],
})
export class AppRoutingModule {}
