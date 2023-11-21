import { TestBed } from '@angular/core/testing';

import { ProveedorXFormaPagoService } from './proveedor-xforma-pago.service';

describe('ProveedorXFormaPagoService', () => {
  let service: ProveedorXFormaPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedorXFormaPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
