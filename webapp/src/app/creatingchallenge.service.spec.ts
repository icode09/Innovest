import { TestBed } from '@angular/core/testing';

import { CreatingchallengeService } from './creatingchallenge.service';

describe('CreatingchallengeService', () => {
  let service: CreatingchallengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatingchallengeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
