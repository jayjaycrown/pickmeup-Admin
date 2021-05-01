import { Component, OnInit, AfterViewInit, TemplateRef, OnDestroy } from '@angular/core';
// import { ɵTestingCompiler } from '@angular/core/testing';
// import { FirebaseService } from '../../_services/firebase.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertService } from '@full-fledged/alerts';
// declare var google: any;
// import GoogleMaps from 'google-maps';
import { UserService } from '../../_services/user.service';

declare var google;

@Component({
	selector: 'app-assign',
	templateUrl: './assign.component.html',
	styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit, AfterViewInit, OnDestroy {

	lat = 106.537216;
	lng = 403.3456128;

	// public driver = [
	// 	{ name: 'test', location:  '1, salami street, mende, maryland', distance: '' },
	// 	{ name: 'test2', location: '16, jimoh Oladehinde, gbagada', distance: '' },
	// 	// { name: 'test3', location:  '40, -10'  },
	// 	// { name: 'test4', location: '50, -20' },
	// 	// { name: 'test5', location: '60,-30 ' }
	// ];

	// public user = [
	// 	{ name: "testing", location: 'San Francisco, Californie, États-Unis' }
	// ];
	public driver = [];
	driverWithDistance = [];
	token: any;
	deliveries: any[];
	newreference: any;
	modalRef: BsModalRef;
	message: string;
	newpickupAddress: any;
	riders: any;
	requestType: any;
	refresh;
	key = 'distance';
	key1 = 'date';
	key2 = 'id';
	key3 = 'id';
	key4 = 'id';
	reverse = false;
	reverse1 = true;
	reverse2 = false;
	reverse3 = false;
	reverse4 = false;
	p = 1;
	q = 1;
	r = 1;
	s = 1;
	t = 1;
	errormessage: string;
	unassigned = false;
	assigned = false;
	pickedUp = false;
	completed = false;
	assignedDeliveries: any[];
	pickedupDeliveries: any[];
	completedDeliveries: any[];
	unassignedLength: any;
	assignedLength: any;
	completedLength: any;
	pickedUpLength: any;
	constructor(
		// private geo: FirebaseService,
		private userService: UserService,
		private modalService: BsModalService,
		private alertService: AlertService
	) {
		this.unAssigned();
	}

	unAssigned() {
		this.unassigned = true;
		this.assigned = false;
		this.pickedUp = false;
		this.completed = false;
	}
	Assigned() {
		this.unassigned = false;
		this.assigned = true;
		this.pickedUp = false;
		this.completed = false;
	}
	PickedUp() {
		this.unassigned = false;
		this.assigned = false;
		this.pickedUp = true;
		this.completed = false;
	}
	Completed() {
		this.unassigned = false;
		this.assigned = false;
		this.pickedUp = false;
		this.completed = true;
	}
	sort(key) {
		this.key = key;
		this.reverse = !this.reverse;
	}

	sort1(key) {
		this.key1 = key;
		this.reverse1 = !this.reverse1;
	}
	sort2(key) {
		this.key2 = key;
		this.reverse2 = !this.reverse2;
	}

	sort3(key) {
		this.key3 = key;
		this.reverse3 = !this.reverse3;
	}
	sort4(key) {
		this.key4 = key;
		this.reverse4 = !this.reverse4;
	}

	async ngOnInit() {
		const user = await JSON.parse(localStorage.getItem("user"));
		this.token = user.token;
		this.getUserRequest();
		this.getAssignedRequests();
		this.getPickedUpDeliveries();
		this.getCompletedDeliveries();
		this.refresh = setInterval(() => {
			this.getUserRequest();
		this.getAssignedRequests();
		this.getPickedUpDeliveries();
		this.getCompletedDeliveries();
		}, 60000);

	}
	ngOnDestroy() {
		if (this.refresh) {
			clearInterval(this.refresh);
		}
	}

	// async fetchAvailableRiders() {
	// 	this.userService.fetchAvailableRiders(this.token).subscribe((res: any) => {
	// 		console.log(res);
	// 		if (res.success !== true) {
	// 			this.alertService.danger('No Available Driver');
	// 		} else {
	// 			this.driver = res.riders;
	// 		}
	// 	});
	// }
	ngAfterViewInit(): void {
		// this.gettwoDistance();
	}

	getUserRequest() {
		this.userService.fetchRequestDetails(this.token).subscribe((res: any) => {
			// console.log(res);
			this.deliveries = res.deliveries;
			this.unassignedLength = this.deliveries.length;
		});
	}


	getAssignedRequests() {
		this.userService.fetchAssignedDeliveries(this.token).subscribe((res: any) => {
			// console.log(res);
			this.assignedDeliveries = res.deliveries;
			this.assignedLength = this.assignedDeliveries.length;
		});
	}

	getPickedUpDeliveries() {
		this.userService.fetchPickedUpDeliveries(this.token).subscribe((res: any) => {
			// console.log(res);
			this.pickedupDeliveries = res.deliveries;
			this.pickedUpLength = this.pickedupDeliveries.length;
		});
	}

	getCompletedDeliveries() {
		this.userService.fetchCompletedDeliveries(this.token).subscribe((res: any) => {
			// console.log(res);
			this.completedDeliveries = res.deliveries;
			this.completedLength = this.completedDeliveries.length;

		});
	}
	// getUserLocation() {
	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.getCurrentPosition(position => {
	// 			console.log(position);
	// 			this.lat = position.coords.latitude;
	// 			this.lng = position.coords.longitude;
	// 			// console.log(this.lat, this.lng);
	// 			const locations = this.geo.getLocations(500, [this.lat, this.lng]);
	// 			// console.log('locations: ', locations);
	// 			// const distance = this.geo.distanceBetween(this.lat, this.lng);
	// 			// console.log('Distance: ', distance); pickupState
	// 		});
	// 		// console.log('lat: ' + this.lat + ', Lng: ' + this.lng);
	// 	}
	// }

	async gettwoDistance(pickupaddress) {
		// alert(this.newpickupAddress);
		// await this.fetchAvailableRiders();
		const driverWithDistance = [];
		this.errormessage = '';
		this.userService.fetchAvailableRiders(this.token).subscribe((res: any) => {
			// console.log(res);
			if (res.success !== true) {
				this.alertService.danger('No Available Driver');
			} else {
				this.driver = res.riders;
				const driverlist = this.driver;
				for (let index = 0; index < driverlist.length; index++) {
					let element = driverlist[index];
					const okay = element.location;
					element.location = '';
					const text = okay.replace(/&quot;/g, '"');
					// console.log(text);
					const driverLocation = JSON.parse(text);
					const location = driverLocation[0];
					// console.log(driverLocation[1]);

					// if (element.includes(location)) {
					// 		element[index] = location;
					// }
					// });
					// tslint:disable-next-line: max-line-length
					const testing = new google.maps.DistanceMatrixService();
					testing.getDistanceMatrix(
						{
							'origins': [pickupaddress],
							'destinations': [driverLocation[1]],
							travelMode: google.maps.TravelMode.DRIVING,
							unitSystem: google.maps.UnitSystem.METRIC,
						}, (result: any) => {
							// console.log(result);
							if (result.rows[0].elements[0].status === "ZERO_RESULTS") {
								this.alertService.danger('No route could be found between the origin and destination.');

							} else if (result.rows[0].elements[0].status === "NOT_FOUND") {
								this.alertService.danger('The origin and/or destination of this pairing could not be geocoded.');
							} else {
								const distance = {
									distance: result.rows[0].elements[0].distance.value
								};
									element = { ...element, ...location };
								element = { ...element, ...distance };
								element.distance = result.rows[0].elements[0].distance.value;
								element.location = location;

								driverWithDistance.push(element);
								this.driver = driverWithDistance;
							}
							if (this.errormessage) {
							this.alertService.danger(this.errormessage);
						}
						if (result.status === "OK") {
								const distance = {
									distance:   result.rows[0].elements[0].distance.text
								};
								element = { ...element, ...distance };
								element.distance =  result.rows[0].elements[0].distance.text;

								driverWithDistance.push(element);
								this.driver = driverWithDistance;
							} else if (result.status === "NOT_FOUND") {
								this.errormessage = 'The origin and/or destination of this pairing could not be geocoded.';
							} else if (result.status === "ZERO_RESULTS") {
									this.errormessage = 'No route could be found between the origin and destination.';
							} else {
								// alert(result.status);
							}
						// console.log('Result distance (mts) -- ', result.rows[0].elements[0].distance.text);
					});
					// this.geo.getDistancia2(pickupaddress, driverLocation).then((resp: any) => {
					// 	// console.log(res);
					// 	// console.log(res.rows[0].elements[0]);
					// 	if (resp.status === 'OK') {
					// 		const result = resp.rows[0].elements[0];
					// 		if (result.status === "OK") {
					// 			const distance = {
					// 				distance: result.distance.text
					// 			};
					// 			element = { ...element, ...distance };
					// 			element.distance = result.distance.text;

					// 			driverWithDistance.push(element);
					// 			this.driver = driverWithDistance;
					// 		} else if (result.status === "NOT_FOUND") {
					// 			this.errormessage = 'The origin and/or destination of this pairing could not be geocoded.';
					// 		} else if (result.status === "ZERO_RESULTS") {
					// 				this.errormessage = 'No route could be found between the origin and destination.';
					// 		} else {
					// 			alert(result.status);
					// 		}

					// 		} else {
					// 			alert(resp.status);
					// 	}

					// 	if (this.errormessage) {
					// 		this.alertService.danger(this.errormessage);
					// 	}
					// });


				}
			}
		});
	}

	// getDistance(origen, destino) {
	// 	return new google.maps.DistanceMatrixService().getDistanceMatrix({
	// 		'origins': [origen],
	// 		'destinations': [destino],
	// 		travelMode: google.maps.TravelMode.DRIVING,
	// 		unitSystem: google.maps.UnitSystem.METRIC,
	// 		avoidHighways: false,
	// 		avoidTolls: false
	// 	}, (results: any) => {
	// 		// console.log(results);
	// 		return results;
	// 		console.log('result Distance (mts) -- ', results.rows[0].elements[0].distance.value);
	// 	});
	// }

	// getDistance(origin, destination) {
	//   const distanceService = new google.maps.DistanceMatrixService();
	//   distanceService.getDistanceMatrix({
	//       origins: origin,
	//       destinations: destination,
	//       travelMode: google.maps.TravelMode.DRIVING,
	//       unitSystem: google.maps.UnitSystem.METRIC,
	//       // durationInTraffic: true,
	//       avoidHighways: false,
	//       avoidTolls: false
	//   },
	//   (response, status) => {
	//       if (status !== google.maps.DistanceMatrixStatus.OK) {
	//           console.log('Error:', status);
	//       } else {
	//           console.log(response);
	//           $("#distance").text(response.rows[0].elements[0].distance.text).show();
	//           $("#duration").text(response.rows[0].elements[0].duration.text).show();
	//       }
	//   });
	// }


	decline(): void {
		this.message = 'Declined!';
		this.modalRef.hide();
	}

	openModal(template: TemplateRef<any>, reference, pickupAddress, pickupArea, pickupState, type: string) {
		this.newreference = reference;
		this.newpickupAddress = `${pickupAddress}, ${pickupArea}, ${pickupState}` ;
		this.requestType = type.toLowerCase();
		this.modalRef = this.modalRef = this.modalService.show(
			template,
			Object.assign({}, { class: 'modal-lg' })
		);
		this.gettwoDistance(this.newpickupAddress);


	}
	assignRider(riderId) {
		const data = {
			reference: this.newreference,
			token: this.token,
			riderId: riderId,
			deliveryType: this.requestType
		};
		// console.log(data);
		this.userService.assignRider(data).subscribe((res: any) => {
			// console.log(res);
			if (res.success === true) {
				this.alertService.success(res.message);
				this.decline();
			} else {
				this.alertService.danger(res.message);
			}
		});
	}

}
