import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioExisteComponent } from './usuario-existe.component';

describe('UsuarioExisteComponent', () => {
  let component: UsuarioExisteComponent;
  let fixture: ComponentFixture<UsuarioExisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioExisteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioExisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
