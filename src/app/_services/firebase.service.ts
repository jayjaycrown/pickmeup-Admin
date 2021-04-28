// import { Injectable } from '@angular/core';
// import { AngularFireDatabase} from '@angular/fire/database';
// import { BehaviorSubject } from 'rxjs';
// // import * as Geofire from "geofire";
// // const geofire
// import { environment } from "../../environments/environment";
// // import * as geofire from 'geofire';
// import { GeoFire } from 'geofire';
// // import * as firebase from 'firebase/app';
// import firebase from 'firebase';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class FirebaseService {


// 	dbRef: any;
// 	geoFire: any;
// 	hits = new BehaviorSubject<any>('');
// 	constructor(private db: AngularFireDatabase, private http: HttpClient) {
// 		const firebaseRef = firebase.database().ref('locations');
// 		this.dbRef = firebaseRef;
// 		this.geoFire = new GeoFire(this.dbRef);
// 	}

// 	setLocations(key: string, coords: Array<number>) {
// 		this.geoFire.set(key, coords);
// 	}

// 	distanceBetween(location1, location2) {
// 		// this.geoFire.distanceBetween(location1, location2);
// 		// const queryLocation  = QueryLocation.fromDegrees(latitude, longitude);
// 	}

// 	getLocations(radius: number, coords: Array<number>) {
// 		this.geoFire.query({
// 			center: coords,
// 			radius: radius
// 		})
// 			.on('key_entered', (key, location, distance) => {
// 				let hit = {
// 					location: location,
// 					distance: distance
// 				};

// 				let currentHits = this.hits.value;
// 				currentHits.push(hit);
// 				this.hits.next(currentHits);
// 			});
// 	}

// 	 getDistance(origin, destination) {
//      const distanceService = new google.maps.DistanceMatrixService();
//      distanceService.getDistanceMatrix({
//         origins: [origin],
//         destinations: [destination],
//         travelMode: google.maps.TravelMode.DRIVING,
//         unitSystem: google.maps.UnitSystem.METRIC,
//         // durationInTraffic: true,
//         avoidHighways: false,
//         avoidTolls: false
//     },
//     (response, status) => {
//         if (status !== google.maps.DistanceMatrixStatus.OK) {
//             console.log('Error:', status);
//         } else {
//             console.log(response);
//             $("#distance").text(response.rows[0].elements[0].distance.text).show();
//             $("#duration").text(response.rows[0].elements[0].duration.text).show();
//         }
//     });
// 	 }



// 	public getDistancia(origen: string, destino: string) {
// 		return new google.maps.DistanceMatrixService().getDistanceMatrix({
// 			'origins': [origen],
// 			'destinations': [destino],
// 			travelMode: google.maps.TravelMode.DRIVING,
// 			unitSystem: google.maps.UnitSystem.METRIC,
// 			avoidHighways: false,
//       avoidTolls: false
// 		}, (results: any) => {
// 				return results;
// 				console.log('resultados distancia (mts) -- ', results.rows[0].elements[0].distance.value);
//     });
// 	}

// 	getDistance2(origin, destination) {
// 			const api = environment.googleMapsKey;
// 		const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${api}`;
// 		// const httpOptions = '';

// 		// tslint:disable-next-line: max-line-length
// 		return this.http.get(url).pipe();
// 	}

// 	public getDistancia2(origen: string, destino: string) {
//     new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': [origen], 'destinations': [destino], travelMode: google.maps.TravelMode.DRIVING}, (results: any) => {
// 			console.log('resultados distancia (mts) -- ', results.rows[0].elements[0].distance.value);
//     });
// }
// }
