import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFormaEnvioModificarComponent } from './proveedor-forma-envio-modificar.component';

describe('ProveedorFormaEnvioModificarComponent', () => {
  let component: ProveedorFormaEnvioModificarComponent;
  let fixture: ComponentFixture<ProveedorFormaEnvioModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorFormaEnvioModificarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorFormaEnvioModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
