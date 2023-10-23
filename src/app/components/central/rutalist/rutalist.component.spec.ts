import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutalistComponent } from './rutalist.component';

describe('RutalistComponent', () => {
  let component: RutalistComponent;
  let fixture: ComponentFixture<RutalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
