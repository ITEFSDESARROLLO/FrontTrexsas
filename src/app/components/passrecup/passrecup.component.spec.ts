import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassrecupComponent } from './passrecup.component';

describe('PassrecupComponent', () => {
  let component: PassrecupComponent;
  let fixture: ComponentFixture<PassrecupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassrecupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassrecupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
