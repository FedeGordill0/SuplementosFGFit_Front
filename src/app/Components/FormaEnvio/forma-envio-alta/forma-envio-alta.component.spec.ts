import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaEnvioAltaComponent } from './forma-envio-alta.component';

describe('FormaEnvioAltaComponent', () => {
  let component: FormaEnvioAltaComponent;
  let fixture: ComponentFixture<FormaEnvioAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaEnvioAltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaEnvioAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
