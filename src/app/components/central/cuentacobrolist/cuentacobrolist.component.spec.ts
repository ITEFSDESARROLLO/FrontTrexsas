import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentacobrolistComponent } from './cuentacobrolist.component';

describe('CuentacobrolistComponent', () => {
  let component: CuentacobrolistComponent;
  let fixture: ComponentFixture<CuentacobrolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentacobrolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentacobrolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
