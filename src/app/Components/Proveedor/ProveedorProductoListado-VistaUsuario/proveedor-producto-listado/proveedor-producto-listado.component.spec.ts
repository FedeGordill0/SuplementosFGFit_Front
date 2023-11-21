import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorProductoListadoComponent } from './proveedor-producto-listado.component';

describe('ProveedorProductoListadoComponent', () => {
  let component: ProveedorProductoListadoComponent;
  let fixture: ComponentFixture<ProveedorProductoListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorProductoListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorProductoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
