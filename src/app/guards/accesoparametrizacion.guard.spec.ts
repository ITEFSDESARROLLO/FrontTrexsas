import { TestBed } from '@angular/core/testing';

import { AccesoparametrizacionGuard } from './accesoparametrizacion.guard';

describe('AccesoparametrizacionGuard', () => {
  let guard: AccesoparametrizacionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesoparametrizacionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
