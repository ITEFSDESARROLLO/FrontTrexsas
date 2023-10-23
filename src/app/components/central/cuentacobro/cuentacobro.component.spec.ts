import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentacobroComponent } from './cuentacobro.component';

describe('CuentacobroComponent', () => {
  let component: CuentacobroComponent;
  let fixture: ComponentFixture<CuentacobroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentacobroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentacobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
