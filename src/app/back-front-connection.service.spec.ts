import { TestBed } from '@angular/core/testing';

import { BackFrontConnectionService } from './back-front-connection.service';

describe('BackFrontConnectionService', () => {
  let service: BackFrontConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackFrontConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});