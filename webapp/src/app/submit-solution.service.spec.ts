import { TestBed } from '@angular/core/testing';

import { SubmitSolutionService } from './submit-solution.service';

describe('SubmitSolutionService', () => {
  let service: SubmitSolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitSolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
