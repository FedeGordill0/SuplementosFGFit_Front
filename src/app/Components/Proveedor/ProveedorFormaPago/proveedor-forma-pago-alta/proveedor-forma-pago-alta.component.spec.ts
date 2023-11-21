import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFormaPagoAltaComponent } from './proveedor-forma-pago-alta.component';

describe('ProveedorFormaPagoAltaComponent', () => {
  let component: ProveedorFormaPagoAltaComponent;
  let fixture: ComponentFixture<ProveedorFormaPagoAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorFormaPagoAltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorFormaPagoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
