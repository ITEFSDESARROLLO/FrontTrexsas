import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionesListComponent } from './capacitaciones-list.component';

describe('CapacitacionesListComponent', () => {
  let component: CapacitacionesListComponent;
  let fixture: ComponentFixture<CapacitacionesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacitacionesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacitacionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
