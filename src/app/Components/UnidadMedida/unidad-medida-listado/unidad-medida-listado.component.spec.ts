import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMedidaListadoComponent } from './unidad-medida-listado.component';

describe('UnidadMedidaListadoComponent', () => {
  let component: UnidadMedidaListadoComponent;
  let fixture: ComponentFixture<UnidadMedidaListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadMedidaListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadMedidaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
