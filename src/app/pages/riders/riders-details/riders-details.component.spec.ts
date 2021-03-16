import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidersDetailsComponent } from './riders-details.component';

describe('RidersDetailsComponent', () => {
  let component: RidersDetailsComponent;
  let fixture: ComponentFixture<RidersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RidersDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RidersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
