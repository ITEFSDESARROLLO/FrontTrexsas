import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FueclistComponent } from './fueclist.component';

describe('FueclistComponent', () => {
  let component: FueclistComponent;
  let fixture: ComponentFixture<FueclistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FueclistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FueclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
