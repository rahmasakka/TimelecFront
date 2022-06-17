import { TestBed } from '@angular/core/testing';

import { MechanicalService } from './mechanical.service';

describe('MechanicalService', () => {
  let service: MechanicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MechanicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
