import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMedidaAltaComponent } from './unidad-medida-alta.component';

describe('UnidadMedidaAltaComponent', () => {
  let component: UnidadMedidaAltaComponent;
  let fixture: ComponentFixture<UnidadMedidaAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadMedidaAltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadMedidaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
