import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionFuecQRComponent } from './informacion-fuec-qr.component';

describe('InformacionFuecQRComponent', () => {
  let component: InformacionFuecQRComponent;
  let fixture: ComponentFixture<InformacionFuecQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionFuecQRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionFuecQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
