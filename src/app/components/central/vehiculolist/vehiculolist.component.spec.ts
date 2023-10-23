import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculolistComponent } from './vehiculolist.component';

describe('VehiculolistComponent', () => {
  let component: VehiculolistComponent;
  let fixture: ComponentFixture<VehiculolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
