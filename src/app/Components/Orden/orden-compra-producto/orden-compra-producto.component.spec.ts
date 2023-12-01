import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraProductoComponent } from './orden-compra-producto.component';

describe('OrdenCompraProductoComponent', () => {
  let component: OrdenCompraProductoComponent;
  let fixture: ComponentFixture<OrdenCompraProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenCompraProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenCompraProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
