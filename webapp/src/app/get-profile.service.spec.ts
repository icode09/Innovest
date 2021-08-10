import { TestBed } from '@angular/core/testing';

import { GetProfileService } from './get-profile.service';

describe('GetProfileService', () => {
  let service: GetProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
