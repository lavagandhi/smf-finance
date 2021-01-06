/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoanProgressService } from './loan-progress.service';

describe('Service: LoanProgress', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoanProgressService]
    });
  });

  it('should ...', inject([LoanProgressService], (service: LoanProgressService) => {
    expect(service).toBeTruthy();
  }));
});
