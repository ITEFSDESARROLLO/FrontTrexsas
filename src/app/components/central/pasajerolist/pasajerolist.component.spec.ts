import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasajerolistComponent } from './pasajerolist.component';

describe('PasajerolistComponent', () => {
  let component: PasajerolistComponent;
  let fixture: ComponentFixture<PasajerolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasajerolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasajerolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
