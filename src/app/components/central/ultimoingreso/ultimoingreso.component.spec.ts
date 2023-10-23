import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimoingresoComponent } from './ultimoingreso.component';

describe('UltimoingresoComponent', () => {
  let component: UltimoingresoComponent;
  let fixture: ComponentFixture<UltimoingresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltimoingresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimoingresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
