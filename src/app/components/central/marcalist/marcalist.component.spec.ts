import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcalistComponent } from './marcalist.component';

describe('MarcalistComponent', () => {
  let component: MarcalistComponent;
  let fixture: ComponentFixture<MarcalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
