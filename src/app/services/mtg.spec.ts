import { TestBed } from '@angular/core/testing';

import { MtgService } from './mtg';

describe('Mtg', () => {
  let service: MtgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
