import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietariolistComponent } from './propietariolist.component';

describe('PropietariolistComponent', () => {
  let component: PropietariolistComponent;
  let fixture: ComponentFixture<PropietariolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropietariolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropietariolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
