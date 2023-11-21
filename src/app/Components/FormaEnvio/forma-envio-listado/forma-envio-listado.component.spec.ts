import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaEnvioListadoComponent } from './forma-envio-listado.component';

describe('FormaEnvioListadoComponent', () => {
  let component: FormaEnvioListadoComponent;
  let fixture: ComponentFixture<FormaEnvioListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaEnvioListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaEnvioListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
