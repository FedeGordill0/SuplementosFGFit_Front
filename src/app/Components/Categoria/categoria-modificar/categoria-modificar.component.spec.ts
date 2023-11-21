import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaModificarComponent } from './categoria-modificar.component';

describe('CategoriaModificarComponent', () => {
  let component: CategoriaModificarComponent;
  let fixture: ComponentFixture<CategoriaModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaModificarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
