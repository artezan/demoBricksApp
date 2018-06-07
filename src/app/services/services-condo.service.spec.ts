import { TestBed, inject } from '@angular/core/testing';

import { ServicesCondoService } from './services-condo.service';

describe('ServicesCondoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicesCondoService]
    });
  });

  it('should be created', inject([ServicesCondoService], (service: ServicesCondoService) => {
    expect(service).toBeTruthy();
  }));
});
