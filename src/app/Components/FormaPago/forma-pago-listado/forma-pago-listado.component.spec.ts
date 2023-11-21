import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagoListadoComponent } from './forma-pago-listado.component';

describe('FormaPagoListadoComponent', () => {
  let component: FormaPagoListadoComponent;
  let fixture: ComponentFixture<FormaPagoListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaPagoListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaPagoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
