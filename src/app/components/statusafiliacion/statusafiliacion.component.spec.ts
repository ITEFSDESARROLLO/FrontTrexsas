import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusafiliacionComponent } from './statusafiliacion.component';

describe('StatusafiliacionComponent', () => {
  let component: StatusafiliacionComponent;
  let fixture: ComponentFixture<StatusafiliacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusafiliacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusafiliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
