import { TestBed } from '@angular/core/testing';

import { GetSolutionsService } from './get-solutions.service';

describe('GetSolutionsService', () => {
  let service: GetSolutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSolutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
