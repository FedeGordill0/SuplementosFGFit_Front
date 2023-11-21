import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraModificarComponent } from './orden-compra-modificar.component';

describe('OrdenCompraModificarComponent', () => {
  let component: OrdenCompraModificarComponent;
  let fixture: ComponentFixture<OrdenCompraModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenCompraModificarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenCompraModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
