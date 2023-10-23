import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuecsaludComponent } from './fuecsalud.component';

describe('FuecsaludComponent', () => {
  let component: FuecsaludComponent;
  let fixture: ComponentFixture<FuecsaludComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuecsaludComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuecsaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
