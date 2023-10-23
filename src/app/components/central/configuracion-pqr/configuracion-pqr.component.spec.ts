import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionPQRComponent } from './configuracion-pqr.component';

describe('ConfiguracionPQRComponent', () => {
  let component: ConfiguracionPQRComponent;
  let fixture: ComponentFixture<ConfiguracionPQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionPQRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionPQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
