import { TestBed } from '@angular/core/testing';

import { Mtg } from './mtg';

describe('Mtg', () => {
  let service: Mtg;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mtg);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
