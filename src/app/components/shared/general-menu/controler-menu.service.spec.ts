import { TestBed, inject } from '@angular/core/testing';

import { ControllerMenuService } from './controller-menu.service';

describe('ControllerMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControllerMenuService]
    });
  });

  it('should be created', inject([ControllerMenuService], (service: ControllerMenuService) => {
    expect(service).toBeTruthy();
  }));
});
