import { TestBed } from '@angular/core/testing';

import { AutguardService } from './autguard.service';

describe('AutguardService', () => {
  let service: AutguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
