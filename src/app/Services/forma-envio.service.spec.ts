import { TestBed } from '@angular/core/testing';

import { FormaEnvioService } from './forma-envio.service';

describe('FormaEnvioService', () => {
  let service: FormaEnvioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormaEnvioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
