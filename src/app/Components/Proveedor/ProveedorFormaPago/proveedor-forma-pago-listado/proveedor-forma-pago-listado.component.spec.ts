import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFormaPagoListadoComponent } from './proveedor-forma-pago-listado.component';

describe('ProveedorFormaPagoListadoComponent', () => {
  let component: ProveedorFormaPagoListadoComponent;
  let fixture: ComponentFixture<ProveedorFormaPagoListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorFormaPagoListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorFormaPagoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
