import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioBajaComponent } from './usuario-baja.component';

describe('UsuarioBajaComponent', () => {
  let component: UsuarioBajaComponent;
  let fixture: ComponentFixture<UsuarioBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioBajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
