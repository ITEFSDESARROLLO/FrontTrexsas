import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipocombustiblelistComponent } from './tipocombustiblelist.component';

describe('TipocombustiblelistComponent', () => {
  let component: TipocombustiblelistComponent;
  let fixture: ComponentFixture<TipocombustiblelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipocombustiblelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipocombustiblelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
