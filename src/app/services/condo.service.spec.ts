import { TestBed, inject } from '@angular/core/testing';

import { CondoService } from './condo.service';

describe('CondoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CondoService]
    });
  });

  it('should be created', inject([CondoService], (service: CondoService) => {
    expect(service).toBeTruthy();
  }));
});
