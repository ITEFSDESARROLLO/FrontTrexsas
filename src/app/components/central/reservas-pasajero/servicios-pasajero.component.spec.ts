import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasPasajeroComponent } from './servicios-pasajero.component';

describe('ServiciosPasajeroComponent', () => {
  let component: ReservasPasajeroComponent;
  let fixture: ComponentFixture<ReservasPasajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservasPasajeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasPasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
