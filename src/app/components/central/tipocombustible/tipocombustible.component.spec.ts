import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipocombustibleComponent } from './tipocombustible.component';

describe('TipocombustibleComponent', () => {
  let component: TipocombustibleComponent;
  let fixture: ComponentFixture<TipocombustibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipocombustibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipocombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
