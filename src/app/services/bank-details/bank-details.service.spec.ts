/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BankDetailsService } from './bank-details.service';

describe('Service: BankDetails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankDetailsService]
    });
  });

  it('should ...', inject([BankDetailsService], (service: BankDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
