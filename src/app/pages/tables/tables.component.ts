import { Component, OnDestroy, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Subject } from 'rxjs';
// import 'rxjs/add/operator/map';
interface Person {
  Id: number;
  Name: string;
  Address: string;
  Budget: string;
  Status: string;
}
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, OnDestroy {
  person: Person[] = [
    { Id: 1, Name: 'Jonathan', Address: 'Lagos, Nigeria', Budget: '$820,000', Status: 'Pending' },
    { Id: 1, Name: 'Crown', Address: 'Ogun, Nigeria', Budget: '$102,000', Status: 'Verified' },
    { Id: 1, Name: 'Tessal', Address: 'Ibadan, Nigeria', Budget: '$112,000', Status: 'Canceled' },
    { Id: 1, Name: 'Ola', Address: 'PHC, Nigeria', Budget: '$312,000', Status: 'Pending' },
    { Id: 1, Name: 'Gary', Address: 'Houston, Texas', Budget: '$712,000', Status: 'Verified' },
    { Id: 1, Name: 'Testing', Address: 'Mumbai, India', Budget: '$212,000', Status: 'On Hold' },
    {Id: 1, Name: 'Kodehead', Address: 'Ontario, Canada', Budget: '$129,000', Status: 'Canceled'}
  ];
  dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject<any>();
  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }

}
