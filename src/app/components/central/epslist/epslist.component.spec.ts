import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpslistComponent } from './epslist.component';

describe('EpslistComponent', () => {
  let component: EpslistComponent;
  let fixture: ComponentFixture<EpslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
