import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservalistComponent } from './reservalist.component';

describe('ReservalistComponent', () => {
  let component: ReservalistComponent;
  let fixture: ComponentFixture<ReservalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
