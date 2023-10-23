import { TestBed } from '@angular/core/testing';

import { AccesopasajeroGuard } from './accesopasajero.guard';

describe('AccesopasajeroGuard', () => {
  let guard: AccesopasajeroGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesopasajeroGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
