import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFormaPagoEliminarComponent } from './proveedor-forma-pago-eliminar.component';

describe('ProveedorFormaPagoEliminarComponent', () => {
  let component: ProveedorFormaPagoEliminarComponent;
  let fixture: ComponentFixture<ProveedorFormaPagoEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorFormaPagoEliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorFormaPagoEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
