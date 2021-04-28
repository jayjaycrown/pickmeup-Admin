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
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from '@full-fledged/alerts';
import { AccordionModule } from 'ngx-bootstrap/accordion';
// import { AssignComponent } from './pages/assign/assign.component';
// import { InternationalDeliveryComponent } from './pages/international-delivery/international-delivery.component';
// import { InterstateDeliveryComponent } from './pages/interstate-delivery/interstate-delivery.component';
// import { RequestDetailsComponent } from './pages/requests/request-details/request-details.component';


// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';
// import { InterstateComponent } from './pages/interstate/interstate.component';
// import { InternationalComponent } from './pages/international/international.component';




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
		AlertModule.forRoot({ maxMessages: 3, timeout: 3000, positionX: 'right' }),
		// AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule, // firestore
    // AngularFireAuthModule, // auth
		// AngularFireStorageModule, // storage
		// AngularFireDatabaseModule,
		// AgmCoreModule.forRoot({
		// 	apiKey: environment.googleMapsKey,
		// 	libraries: ['geometry']
		// })
	],
	declarations: [
		AppComponent,
		AdminLayoutComponent,
		AuthLayoutComponent,
		// InterstateComponent,
		// InternationalComponent,
		// AssignComponent,
		// InternationalDeliveryComponent,
		// InterstateDeliveryComponent,
		// RequestDetailsComponent,
	],
	providers: [
		// BsModalService,
		// AngularFirestore
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent]
})
export class AppModule { }
