import { TestBed } from '@angular/core/testing';

import { AccesocentralGuard } from './accesocentral.guard';

describe('AccesocentralGuard', () => {
  let guard: AccesocentralGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesocentralGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
