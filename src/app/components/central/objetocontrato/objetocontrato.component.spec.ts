import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetocontratoComponent } from './objetocontrato.component';

describe('ObjetocontratoComponent', () => {
  let component: ObjetocontratoComponent;
  let fixture: ComponentFixture<ObjetocontratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetocontratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetocontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
