import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMedidaBajaComponent } from './unidad-medida-baja.component';

describe('UnidadMedidaBajaComponent', () => {
  let component: UnidadMedidaBajaComponent;
  let fixture: ComponentFixture<UnidadMedidaBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadMedidaBajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadMedidaBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
