import { TestBed } from '@angular/core/testing';

import { AcceSSOrdenServicioGuard } from './acce-ssorden-servicio.guard';

describe('AcceSSOrdenServicioGuard', () => {
  let guard: AcceSSOrdenServicioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AcceSSOrdenServicioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
