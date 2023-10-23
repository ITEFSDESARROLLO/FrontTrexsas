import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaconveniolistComponent } from './empresaconveniolist.component';

describe('EmpresaconveniolistComponent', () => {
  let component: EmpresaconveniolistComponent;
  let fixture: ComponentFixture<EmpresaconveniolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaconveniolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaconveniolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
