import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFormaEnvioListadoComponent } from './proveedor-forma-envio-listado.component';

describe('ProveedorFormaEnvioListadoComponent', () => {
  let component: ProveedorFormaEnvioListadoComponent;
  let fixture: ComponentFixture<ProveedorFormaEnvioListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorFormaEnvioListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorFormaEnvioListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
