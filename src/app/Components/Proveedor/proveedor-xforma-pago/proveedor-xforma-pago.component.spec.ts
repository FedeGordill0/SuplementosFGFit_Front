import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorXFormaPagoComponent } from './proveedor-xforma-pago.component';

describe('ProveedorXFormaPagoComponent', () => {
  let component: ProveedorXFormaPagoComponent;
  let fixture: ComponentFixture<ProveedorXFormaPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorXFormaPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorXFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
