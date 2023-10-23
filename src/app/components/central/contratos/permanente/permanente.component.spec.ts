import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanenteComponent } from './permanente.component';

describe('PermanenteComponent', () => {
  let component: PermanenteComponent;
  let fixture: ComponentFixture<PermanenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermanenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
