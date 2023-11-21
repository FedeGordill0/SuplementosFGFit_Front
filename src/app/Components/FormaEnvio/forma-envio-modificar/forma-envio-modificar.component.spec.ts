import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaEnvioModificarComponent } from './forma-envio-modificar.component';

describe('FormaEnvioModificarComponent', () => {
  let component: FormaEnvioModificarComponent;
  let fixture: ComponentFixture<FormaEnvioModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaEnvioModificarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaEnvioModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
