import { TestBed } from '@angular/core/testing';

import { CacheHelperService } from './cache-helper.service';

describe('CacheHelperService', () => {
  let service: CacheHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
