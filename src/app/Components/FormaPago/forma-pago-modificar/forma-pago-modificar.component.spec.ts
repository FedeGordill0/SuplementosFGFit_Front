import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagoModificarComponent } from './forma-pago-modificar.component';

describe('FormaPagoModificarComponent', () => {
  let component: FormaPagoModificarComponent;
  let fixture: ComponentFixture<FormaPagoModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaPagoModificarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaPagoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
