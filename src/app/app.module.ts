import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { DataTablesModule } from 'angular-datatables';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from '@full-fledged/alerts';
import { AccordionModule } from 'ngx-bootstrap/accordion';
// import { RequestDetailsComponent } from './pages/requests/request-details/request-details.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: false
};


@NgModule({
	imports: [
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		ComponentsModule,
		NgbModule,
		LoadingBarHttpClientModule,
		LoadingBarRouterModule,
		LoadingBarModule,
		RouterModule,
		AppRoutingModule,
		PerfectScrollbarModule,
		NgScrollbarModule,
		DataTablesModule.forRoot(),
		// ModalModule.forRoot(),
		AccordionModule.forRoot(),
		ModalModule.forRoot(),
		AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: 'right'})
	],
	declarations: [
		AppComponent,
		AdminLayoutComponent,
		AuthLayoutComponent,
		// RequestDetailsComponent,
	],
	providers: [
		// BsModalService,
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		}
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent]
})
export class AppModule { }
