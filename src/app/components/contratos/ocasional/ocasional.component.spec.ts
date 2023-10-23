import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcasionalComponent } from './ocasional.component';

describe('AuditComponent', () => {
  let component: OcasionalComponent;
  let fixture: ComponentFixture<OcasionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcasionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcasionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
