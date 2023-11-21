import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorBajaComponent } from './proveedor-baja.component';

describe('ProveedorBajaComponent', () => {
  let component: ProveedorBajaComponent;
  let fixture: ComponentFixture<ProveedorBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorBajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
