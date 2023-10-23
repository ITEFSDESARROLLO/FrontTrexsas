import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenserviciolistComponent } from './ordenserviciolist.component';

describe('OrdenserviciolistComponent', () => {
  let component: OrdenserviciolistComponent;
  let fixture: ComponentFixture<OrdenserviciolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenserviciolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenserviciolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
