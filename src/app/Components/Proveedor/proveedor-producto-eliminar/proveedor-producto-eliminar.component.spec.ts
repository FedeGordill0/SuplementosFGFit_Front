import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorProductoEliminarComponent } from './proveedor-producto-eliminar.component';

describe('ProveedorProductoEliminarComponent', () => {
  let component: ProveedorProductoEliminarComponent;
  let fixture: ComponentFixture<ProveedorProductoEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorProductoEliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorProductoEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
