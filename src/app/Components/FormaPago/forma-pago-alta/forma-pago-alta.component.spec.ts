import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagoAltaComponent } from './forma-pago-alta.component';

describe('FormaPagoAltaComponent', () => {
  let component: FormaPagoAltaComponent;
  let fixture: ComponentFixture<FormaPagoAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaPagoAltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaPagoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
