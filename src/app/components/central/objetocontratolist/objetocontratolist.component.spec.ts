import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetocontratolistComponent } from './objetocontratolist.component';

describe('ObjetocontratolistComponent', () => {
  let component: ObjetocontratolistComponent;
  let fixture: ComponentFixture<ObjetocontratolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetocontratolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetocontratolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
