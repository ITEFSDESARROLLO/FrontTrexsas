import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcasionallistComponent } from './ocasionallist.component';

describe('OcasionallistComponent', () => {
  let component: OcasionallistComponent;
  let fixture: ComponentFixture<OcasionallistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcasionallistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcasionallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
