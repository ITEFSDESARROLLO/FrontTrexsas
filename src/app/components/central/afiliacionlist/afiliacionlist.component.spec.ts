import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliacionlistComponent } from './afiliacionlist.component';

describe('AfiliacionlistComponent', () => {
  let component: AfiliacionlistComponent;
  let fixture: ComponentFixture<AfiliacionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliacionlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliacionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
