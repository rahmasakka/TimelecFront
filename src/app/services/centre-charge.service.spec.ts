import { TestBed } from '@angular/core/testing';

import { CentreChargeService } from './centre-charge.service';

describe('CentreChargeService', () => {
  let service: CentreChargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentreChargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
