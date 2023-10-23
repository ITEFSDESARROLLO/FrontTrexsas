import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesConductoresComponent } from './calificaciones-conductores.component';

describe('CalificacionesConductoresComponent', () => {
  let component: CalificacionesConductoresComponent;
  let fixture: ComponentFixture<CalificacionesConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificacionesConductoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionesConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
