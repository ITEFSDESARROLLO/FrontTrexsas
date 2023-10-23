import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesConductorComponent } from './ordenes-conductor.component';

describe('OrdenesConductorComponent', () => {
  let component: OrdenesConductorComponent;
  let fixture: ComponentFixture<OrdenesConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenesConductorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
