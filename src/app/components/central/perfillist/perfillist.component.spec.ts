import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfillistComponent } from './perfillist.component';

describe('PerfillistComponent', () => {
  let component: PerfillistComponent;
  let fixture: ComponentFixture<PerfillistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfillistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
