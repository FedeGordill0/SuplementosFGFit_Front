import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaEnvioBajaComponent } from './forma-envio-baja.component';

describe('FormaEnvioBajaComponent', () => {
  let component: FormaEnvioBajaComponent;
  let fixture: ComponentFixture<FormaEnvioBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaEnvioBajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaEnvioBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
