import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaselistComponent } from './claselist.component';

describe('ClaselistComponent', () => {
  let component: ClaselistComponent;
  let fixture: ComponentFixture<ClaselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaselistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
