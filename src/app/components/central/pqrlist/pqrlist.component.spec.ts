import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PQRListComponent } from './pqrlist.component';

describe('PQRListComponent', () => {
  let component: PQRListComponent;
  let fixture: ComponentFixture<PQRListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PQRListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PQRListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
