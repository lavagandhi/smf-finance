/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApplicantCreateService } from './applicant-create.service';

describe('Service: ApplicantCreate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicantCreateService]
    });
  });

  it('should ...', inject([ApplicantCreateService], (service: ApplicantCreateService) => {
    expect(service).toBeTruthy();
  }));
});
