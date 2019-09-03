import { TestBed } from '@angular/core/testing';

import { UsuarieHttpService } from './usuarie-http.service';

describe('UsuarieHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarieHttpService = TestBed.get(UsuarieHttpService);
    expect(service).toBeTruthy();
  });
});
