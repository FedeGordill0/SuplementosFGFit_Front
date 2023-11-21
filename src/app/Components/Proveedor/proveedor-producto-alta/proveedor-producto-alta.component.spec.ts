import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorProductoAltaComponent } from './proveedor-producto-alta.component';

describe('ProveedorProductoAltaComponent', () => {
  let component: ProveedorProductoAltaComponent;
  let fixture: ComponentFixture<ProveedorProductoAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorProductoAltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorProductoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
