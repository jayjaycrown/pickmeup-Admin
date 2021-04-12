import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalDeliveryComponent } from './international-delivery.component';

describe('InternationalDeliveryComponent', () => {
  let component: InternationalDeliveryComponent;
  let fixture: ComponentFixture<InternationalDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
