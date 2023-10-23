import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionesEncuestaComponent } from './configuraciones-encuesta.component';

describe('ConfiguracionesEncuestaComponent', () => {
  let component: ConfiguracionesEncuestaComponent;
  let fixture: ComponentFixture<ConfiguracionesEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionesEncuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionesEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
