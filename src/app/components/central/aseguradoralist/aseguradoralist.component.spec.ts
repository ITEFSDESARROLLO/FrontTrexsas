import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguradoralistComponent } from './aseguradoralist.component';

describe('AseguradoralistComponent', () => {
  let component: AseguradoralistComponent;
  let fixture: ComponentFixture<AseguradoralistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseguradoralistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AseguradoralistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
