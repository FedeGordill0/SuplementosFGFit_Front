import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/Models/categoria';
import { Producto } from 'src/app/Models/producto';
import { UnidadMedida } from 'src/app/Models/unidad-medida';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { ProductoService } from 'src/app/Services/producto.service';
import { UnidadMedidaService } from 'src/app/Services/unidad-medida.service';
import { ErrorComponent } from '../../Messages/Error/error.component';
import { ModificarComponent } from '../../Messages/Producto/modificar/modificar.component';

@Component({
  selector: 'app-producto-modificar',
  templateUrl: './producto-modificar.component.html',
  styleUrls: ['./producto-modificar.component.css'],
})
export class ProductoModificarComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  listadoCategorias: Categoria[];
  listadoUnidades: UnidadMedida[];
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
    private activatedRoute: ActivatedRoute,
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
    this.mostrarForm();
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
        this.productoService.putProducto(this.producto).subscribe({
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

  mostrarForm() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const id = params['id'];

        if (id) {
          this.productoService.getProductoID(id).subscribe({
            next: (p: any) => {
              this.producto = p;
              this.formulario = this.fb.group({
                idProducto: [p.resultado.idProducto],
                descripcion: [p.resultado.descripcion],
                imagen: [p.resultado.imagen],
                marca: [p.resultado.marca],
                nombre: [p.resultado.nombre],
                idCategoria: [p.resultado.idCategoria],
                idUnidadMedida: [p.resultado.idUnidadMedida],
                fechaVencimiento: [p.resultado.fechaVencimiento],
              });
            },
            error: () => {
              alert('ERROR productoService.getProductoID');
            },
          });
        }
      },
      error: () => {
        alert('ERROR activatedRoute.params');
      },
    });
  }
  openSnackBarSuccess() {
    this._snackBar.openFromComponent(ModificarComponent, {
      duration: 1 * 1500,
    });
  }
  openSnackBarError() {
    this._snackBar.openFromComponent(ErrorComponent, {
      duration: 1 * 1500,
    });
  }
}
