import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraAltaComponent } from './orden-compra-alta.component';

describe('OrdenCompraAltaComponent', () => {
  let component: OrdenCompraAltaComponent;
  let fixture: ComponentFixture<OrdenCompraAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenCompraAltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenCompraAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
