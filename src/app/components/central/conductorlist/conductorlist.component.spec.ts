import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductorlistComponent } from './conductorlist.component';

describe('ConductorlistComponent', () => {
  let component: ConductorlistComponent;
  let fixture: ComponentFixture<ConductorlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConductorlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
