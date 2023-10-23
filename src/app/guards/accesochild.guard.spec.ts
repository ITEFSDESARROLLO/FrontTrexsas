import { TestBed } from '@angular/core/testing';

import { AccesochildGuard } from './accesochild.guard';

describe('AccesochildGuard', () => {
  let guard: AccesochildGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesochildGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
