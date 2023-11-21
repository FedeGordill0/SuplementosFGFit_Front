import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorModificarComponent } from './proveedor-modificar.component';

describe('ProveedorModificarComponent', () => {
  let component: ProveedorModificarComponent;
  let fixture: ComponentFixture<ProveedorModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorModificarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
