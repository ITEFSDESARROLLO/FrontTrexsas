import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanentelistComponent } from './permanentelist.component';

describe('PermanentelistComponent', () => {
  let component: PermanentelistComponent;
  let fixture: ComponentFixture<PermanentelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermanentelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanentelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
