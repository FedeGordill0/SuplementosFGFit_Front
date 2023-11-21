import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagoBajaComponent } from './forma-pago-baja.component';

describe('FormaPagoBajaComponent', () => {
  let component: FormaPagoBajaComponent;
  let fixture: ComponentFixture<FormaPagoBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaPagoBajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaPagoBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
