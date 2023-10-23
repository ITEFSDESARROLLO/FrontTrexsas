import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimoingresolistComponent } from './ultimoingresolist.component';

describe('UltimoingresolistComponent', () => {
  let component: UltimoingresolistComponent;
  let fixture: ComponentFixture<UltimoingresolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltimoingresolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimoingresolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
