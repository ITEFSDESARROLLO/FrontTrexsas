import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaconvenioComponent } from './empresaconvenio.component';

describe('EmpresaconvenioComponent', () => {
  let component: EmpresaconvenioComponent;
  let fixture: ComponentFixture<EmpresaconvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaconvenioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaconvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
