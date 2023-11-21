import { TestBed } from '@angular/core/testing';

import { UsuarioxrolService } from './usuarioxrol.service';

describe('UsuarioxrolService', () => {
  let service: UsuarioxrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioxrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
