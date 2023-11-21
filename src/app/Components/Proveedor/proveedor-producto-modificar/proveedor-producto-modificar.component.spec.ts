import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorProductoModificarComponent } from './proveedor-producto-modificar.component';

describe('ProveedorProductoModificarComponent', () => {
  let component: ProveedorProductoModificarComponent;
  let fixture: ComponentFixture<ProveedorProductoModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorProductoModificarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorProductoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
