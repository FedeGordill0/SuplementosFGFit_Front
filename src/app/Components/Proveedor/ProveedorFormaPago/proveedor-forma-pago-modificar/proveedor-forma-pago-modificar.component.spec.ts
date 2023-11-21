import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFormaPagoModificarComponent } from './proveedor-forma-pago-modificar.component';

describe('ProveedorFormaPagoModificarComponent', () => {
  let component: ProveedorFormaPagoModificarComponent;
  let fixture: ComponentFixture<ProveedorFormaPagoModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorFormaPagoModificarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorFormaPagoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
