import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondopensionesComponent } from './fondopensiones.component';

describe('FondopensionesComponent', () => {
  let component: FondopensionesComponent;
  let fixture: ComponentFixture<FondopensionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FondopensionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FondopensionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
