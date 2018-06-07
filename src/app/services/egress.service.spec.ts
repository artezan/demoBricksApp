import { TestBed, inject } from '@angular/core/testing';

import { EgressService } from './egress.service';

describe('EgressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EgressService]
    });
  });

  it('should be created', inject([EgressService], (service: EgressService) => {
    expect(service).toBeTruthy();
  }));
});
