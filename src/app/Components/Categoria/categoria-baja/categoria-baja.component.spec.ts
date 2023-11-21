import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaBajaComponent } from './categoria-baja.component';

describe('CategoriaBajaComponent', () => {
  let component: CategoriaBajaComponent;
  let fixture: ComponentFixture<CategoriaBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaBajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
