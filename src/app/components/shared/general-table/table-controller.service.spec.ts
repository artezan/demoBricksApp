import { TestBed, inject } from '@angular/core/testing';

import { TableControllerService } from './table-controller.service';

describe('TableControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableControllerService]
    });
  });

  it('should be created', inject([TableControllerService], (service: TableControllerService) => {
    expect(service).toBeTruthy();
  }));
});
