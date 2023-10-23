import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipovehiculolistComponent } from './tipovehiculolist.component';

describe('TipovehiculolistComponent', () => {
  let component: TipovehiculolistComponent;
  let fixture: ComponentFixture<TipovehiculolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipovehiculolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipovehiculolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
