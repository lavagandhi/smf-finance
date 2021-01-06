/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoApplicantService } from './co-applicant.service';

describe('Service: CoApplicant', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoApplicantService]
    });
  });

  it('should ...', inject([CoApplicantService], (service: CoApplicantService) => {
    expect(service).toBeTruthy();
  }));
});
