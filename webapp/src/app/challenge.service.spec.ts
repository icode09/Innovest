import { TestBed } from '@angular/core/testing';

import { challengeService } from './challenge.service';

describe('challengeService', () => {
  let service: challengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(challengeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
