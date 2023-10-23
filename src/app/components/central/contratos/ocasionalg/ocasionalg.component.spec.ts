import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcasionalgComponent } from './ocasionalg.component';

describe('OcasionalgComponent', () => {
  let component: OcasionalgComponent;
  let fixture: ComponentFixture<OcasionalgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcasionalgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcasionalgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
