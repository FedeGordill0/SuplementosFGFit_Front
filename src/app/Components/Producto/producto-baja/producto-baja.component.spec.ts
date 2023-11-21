import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoBajaComponent } from './producto-baja.component';

describe('ProductoBajaComponent', () => {
  let component: ProductoBajaComponent;
  let fixture: ComponentFixture<ProductoBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoBajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
