import { TestBed } from '@angular/core/testing';

import { AuthRedirectServiceService } from './auth-redirect-service.service';

describe('AuthRedirectServiceService', () => {
  let service: AuthRedirectServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRedirectServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
