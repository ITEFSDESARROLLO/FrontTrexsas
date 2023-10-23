import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArllistComponent } from './arllist.component';

describe('ArllistComponent', () => {
  let component: ArllistComponent;
  let fixture: ComponentFixture<ArllistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArllistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArllistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
