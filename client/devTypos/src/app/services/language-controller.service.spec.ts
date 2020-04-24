import { TestBed } from '@angular/core/testing';

import { LanguageControllerService } from './language-controller.service';

describe('LanguageControllerService', () => {
  let service: LanguageControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
