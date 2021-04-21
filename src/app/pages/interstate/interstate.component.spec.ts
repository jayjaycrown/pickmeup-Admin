import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterstateComponent } from './interstate.component';

describe('InterstateComponent', () => {
  let component: InterstateComponent;
  let fixture: ComponentFixture<InterstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
