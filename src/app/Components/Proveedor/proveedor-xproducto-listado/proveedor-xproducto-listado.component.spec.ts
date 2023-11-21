import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorXProductoListadoComponent } from './proveedor-xproducto-listado.component';

describe('ProveedorXProductoListadoComponent', () => {
  let component: ProveedorXProductoListadoComponent;
  let fixture: ComponentFixture<ProveedorXProductoListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorXProductoListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorXProductoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
