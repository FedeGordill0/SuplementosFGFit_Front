import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMedidaModificarComponent } from './unidad-medida-modificar.component';

describe('UnidadMedidaModificarComponent', () => {
  let component: UnidadMedidaModificarComponent;
  let fixture: ComponentFixture<UnidadMedidaModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadMedidaModificarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadMedidaModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
