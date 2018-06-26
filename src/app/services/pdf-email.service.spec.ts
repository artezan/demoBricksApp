import { TestBed, inject } from '@angular/core/testing';

import { PdfEmailService } from './pdf-email.service';

describe('PdfEmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfEmailService]
    });
  });

  it('should be created', inject([PdfEmailService], (service: PdfEmailService) => {
    expect(service).toBeTruthy();
  }));
});
