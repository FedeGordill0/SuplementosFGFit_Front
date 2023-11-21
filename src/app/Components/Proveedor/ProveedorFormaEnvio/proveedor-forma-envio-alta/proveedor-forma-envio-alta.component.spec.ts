import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFormaEnvioAltaComponent } from './proveedor-forma-envio-alta.component';

describe('ProveedorFormaEnvioAltaComponent', () => {
  let component: ProveedorFormaEnvioAltaComponent;
  let fixture: ComponentFixture<ProveedorFormaEnvioAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorFormaEnvioAltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorFormaEnvioAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
