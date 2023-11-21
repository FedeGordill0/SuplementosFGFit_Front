import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioModificarComponent } from './usuario-modificar.component';

describe('UsuarioModificarComponent', () => {
  let component: UsuarioModificarComponent;
  let fixture: ComponentFixture<UsuarioModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioModificarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
