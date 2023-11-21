import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductoXProveedor } from 'src/app/Models/producto-xproveedor';
import { ProductoXproveedorService } from 'src/app/Services/producto-xproveedor.service';
import { ProductoService } from 'src/app/Services/producto.service';
import { AltaComponent } from '../../Messages/Categoria/alta/alta.component';
import { ErrorComponent } from '../../Messages/Error/error.component';
import { Producto } from 'src/app/Models/producto';
import { ModificarComponent } from '../../Messages/Producto/modificar/modificar.component';

@Component({
  selector: 'app-proveedor-producto-modificar',
  templateUrl: './proveedor-producto-modificar.component.html',
  styleUrls: ['./proveedor-producto-modificar.component.css'],
})
export class ProveedorProductoModificarComponent {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  listadoProductos: Producto[] = [];
  productoProveedor: ProductoXProveedor;
  idProveedor: any;
  idProducto: any;
  idProductoProveedorGuardar: any;
  constructor(
    private productoXproveedorService: ProductoXproveedorService,
    private productoService: ProductoService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.formulario = this.fb.group({
      idProducto: [[]],
      precio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarForm();
    this.suscripcion.add(
      this.productoService.getProductos().subscribe({
        next: (listado: any) => {
          this.listadoProductos = listado;

          this.activatedRoute.params.subscribe({
            next: (params) => {
              this.idProducto = params['idProducto'];
              this.idProveedor = params['idProveedor'];
            },
            error: () => {},
          });
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
      this.productoProveedor = this.formulario.value;

      const productoProveedorObj: any = {
        idProductoProveedor: this.idProductoProveedorGuardar,
        precio: this.formulario.value.precio,
        idProducto: this.formulario.value.idProducto,
        idProveedor: this.idProveedor,
      };
      this.suscripcion.add(
        this.productoXproveedorService
          .putProductoProveedor(productoProveedorObj)
          .subscribe({
            next: () => {
              this.openSnackBarSuccess();
              this.router.navigate(['proveedor/listado']);
            },
            error: () => {},
          })
      );
    } else {
      this.openSnackBarError();
    }
  }

  cancelar() {
    this.router.navigate(['/proveedor/productos/listado/' + this.idProveedor]);
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

  mostrarForm() {
    this.suscripcion.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const idProveedor = params['idProveedor'];
          const idProducto = params['idProducto'];
          if (idProveedor) {
            this.productoXproveedorService
              .getProductoXProveedorID(idProveedor, idProducto)
              .subscribe({
                next: (p: any) => {
                  console.log(
                    ' this.productoXproveedorService.getProductoXProveedorID(id)',
                    p
                  );

                  this.idProductoProveedorGuardar =
                    p.resultado.idProductoProveedor;

                  this.formulario.patchValue({
                    idProducto: p.resultado.idProducto,
                    precio: [p.resultado.precio],
                    idProductoProveedor: [p.resultado.idProductoProveedor],
                    idProveedor: [idProveedor],
                  });
                },
                error: () => {
                  alert(
                    'this.productoXproveedorService.getProductoXProveedorID(id)'
                  );
                },
              });
          }
        },
        error: () => {
          alert('this.activatedRoute.params');
        },
      })
    );
  }
}
