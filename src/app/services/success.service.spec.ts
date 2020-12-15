/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SuccessService } from './success.service';

describe('Service: Success', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuccessService],
    });
  });

  it('should ...', inject([SuccessService], (service: SuccessService) => {
    expect(service).toBeTruthy();
  }));
});
