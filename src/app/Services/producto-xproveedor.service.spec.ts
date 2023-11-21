import { TestBed } from '@angular/core/testing';

import { ProductoXproveedorService } from './producto-xproveedor.service';

describe('ProductoXproveedorService', () => {
  let service: ProductoXproveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoXproveedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
