import { TestBed, inject } from '@angular/core/testing';

import { PropietariesService } from './propietaries.service';

describe('PropietariesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropietariesService]
    });
  });

  it('should be created', inject([PropietariesService], (service: PropietariesService) => {
    expect(service).toBeTruthy();
  }));
});
