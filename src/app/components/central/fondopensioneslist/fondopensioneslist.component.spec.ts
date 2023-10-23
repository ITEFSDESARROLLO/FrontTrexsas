import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondopensioneslistComponent } from './fondopensioneslist.component';

describe('FondopensioneslistComponent', () => {
  let component: FondopensioneslistComponent;
  let fixture: ComponentFixture<FondopensioneslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FondopensioneslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FondopensioneslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
