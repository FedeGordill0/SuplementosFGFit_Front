import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFormaEnvioEliminarComponent } from './proveedor-forma-envio-eliminar.component';

describe('ProveedorFormaEnvioEliminarComponent', () => {
  let component: ProveedorFormaEnvioEliminarComponent;
  let fixture: ComponentFixture<ProveedorFormaEnvioEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorFormaEnvioEliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorFormaEnvioEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
