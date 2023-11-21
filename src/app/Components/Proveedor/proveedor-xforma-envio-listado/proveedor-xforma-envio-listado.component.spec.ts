import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorXFormaEnvioListadoComponent } from './proveedor-xforma-envio-listado.component';

describe('ProveedorXFormaEnvioListadoComponent', () => {
  let component: ProveedorXFormaEnvioListadoComponent;
  let fixture: ComponentFixture<ProveedorXFormaEnvioListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorXFormaEnvioListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorXFormaEnvioListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
