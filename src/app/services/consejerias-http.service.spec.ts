import { TestBed } from '@angular/core/testing';

import { ConsejeriasHttpService } from './consejerias-http.service';

describe('ConsejeriasHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsejeriasHttpService = TestBed.get(ConsejeriasHttpService);
    expect(service).toBeTruthy();
  });
});
