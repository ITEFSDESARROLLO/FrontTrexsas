import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajacompensacionlistComponent } from './cajacompensacionlist.component';

describe('CajacompensacionlistComponent', () => {
  let component: CajacompensacionlistComponent;
  let fixture: ComponentFixture<CajacompensacionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajacompensacionlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajacompensacionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
