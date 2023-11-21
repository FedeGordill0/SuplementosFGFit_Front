import { TestBed } from '@angular/core/testing';

import { ProveedorXenvioService } from './proveedor-xenvio.service';

describe('ProveedorXenvioService', () => {
  let service: ProveedorXenvioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedorXenvioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
