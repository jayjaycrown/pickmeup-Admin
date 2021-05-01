import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastNotificationsComponent } from './broadcast-notifications.component';

describe('BroadcastNotificationsComponent', () => {
  let component: BroadcastNotificationsComponent;
  let fixture: ComponentFixture<BroadcastNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
