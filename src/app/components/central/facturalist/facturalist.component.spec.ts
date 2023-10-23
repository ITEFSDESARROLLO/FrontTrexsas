import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturalistComponent } from './facturalist.component';

describe('FacturalistComponent', () => {
  let component: FacturalistComponent;
  let fixture: ComponentFixture<FacturalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
