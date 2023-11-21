import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorAltaComponent } from './proveedor-alta.component';

describe('ProveedorAltaComponent', () => {
  let component: ProveedorAltaComponent;
  let fixture: ComponentFixture<ProveedorAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorAltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
