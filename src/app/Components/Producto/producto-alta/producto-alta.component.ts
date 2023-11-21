import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/Models/categoria';
import { Producto } from 'src/app/Models/producto';
import { UnidadMedida } from 'src/app/Models/unidad-medida';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { ProductoService } from 'src/app/Services/producto.service';
import { UnidadMedidaService } from 'src/app/Services/unidad-medida.service';
import { AltaComponent } from '../../Messages/Producto/alta/alta.component';
import { ErrorComponent } from '../../Messages/Error/error.component';

@Component({
  selector: 'app-producto-alta',
  templateUrl: './producto-alta.component.html',
  styleUrls: ['./producto-alta.component.css'],
})
export class ProductoAltaComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  listadoProductos: any[] = [];
  listadoCategorias: any[] = [];
  listadoUnidades: any[] = [];
  producto: Producto;
  validarNombre: any;
  validarDescripcion: any;
  validarMarca: any;
  validarImagen: any;
  fechaVencimiento: any;
  constructor(
    private productoService: ProductoService,
    private router: Router,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private unidadService: UnidadMedidaService,
    private _snackBar: MatSnackBar
  ) {
    this.formulario = this.fb.group({
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      marca: ['', Validators.required],
      nombre: ['', Validators.required],
      idCategoria: [''],
      idUnidadMedida: [''],
      fechaVencimiento: [''],
    });
  }

  ngOnInit(): void {
    this.suscripcion.add(
      this.categoriaService.getCategorias().subscribe({
        next: (listado: any) => {
          this.listadoCategorias = listado;
        },
        error: () => {
          alert('ERROR categoriaService.getCategorias');
        },
      })
    );
    this.suscripcion.add(
      this.unidadService.getUnidadMedidas().subscribe({
        next: (listado: any) => {
          this.listadoUnidades = listado;
        },
        error: () => {
          alert('ERROR categoriaService.getCategorias');
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  guardar() {
    if (this.formulario.valid) {
      this.producto = this.formulario.value;
      this.suscripcion.add(
        this.productoService.postProducto(this.producto).subscribe({
          next: () => {
            this.openSnackBarSuccess();
            this.router.navigate(['producto/listado']);
          },
          error: () => {
            this.validarNombre = false;
            this.validarDescripcion = false;
            this.validarImagen = false;
            this.validarMarca = false;

            if (this.formulario.value.nombre.length > 100) {
              this.validarNombre = true;
            }
            if (this.formulario.value.descripcion.length > 100) {
              this.validarDescripcion = true;
            }
            if (this.formulario.value.marca.length > 100) {
              this.validarMarca = true;
            }
            if (this.formulario.value.imagen.length > 1000) {
              this.validarImagen = true;
            }
          },
        })
      );
    } else {
      this.openSnackBarError();
    }
  }

  cancelar() {
    this.router.navigate(['producto/listado']);
  }
  openSnackBarSuccess() {
    this._snackBar.openFromComponent(AltaComponent, {
      duration: 1 * 1500,
    });
  }
  openSnackBarError() {
    this._snackBar.openFromComponent(ErrorComponent, {
      duration: 1 * 1500,
    });
  }
}
