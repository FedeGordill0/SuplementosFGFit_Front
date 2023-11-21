import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductoXproveedorService } from 'src/app/Services/producto-xproveedor.service';
import { AltaComponent } from '../../Messages/Producto/alta/alta.component';
import { ErrorComponent } from '../../Messages/Error/error.component';
import { ProductoService } from 'src/app/Services/producto.service';
import { ProductoXProveedor } from 'src/app/Models/producto-xproveedor';

@Component({
  selector: 'app-proveedor-producto-alta',
  templateUrl: './proveedor-producto-alta.component.html',
  styleUrls: ['./proveedor-producto-alta.component.css'],
})
export class ProveedorProductoAltaComponent {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  listadoProductos: any[] = [];
  productoProveedor: ProductoXProveedor;
  idProveedor: any;
  constructor(
    private productoXproveedorService: ProductoXproveedorService,
    private productoService: ProductoService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.formulario = this.fb.group({
      idProducto: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.suscripcion.add(
      this.productoService.getProductos().subscribe({
        next: (listado: any) => {
          console.log('listadolistadolistadolistadolistado', listado);
          this.listadoProductos = listado;

          this.activatedRoute.params.subscribe({
            next: (params) => {
              this.idProveedor = params['idProveedor'];
              console.log(
                'productoProveedorForproductoProveedorForproductoProveedorFor',
                this.idProveedor
              );
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
      console.log(
        'this.productoProveedorthis.productoProveedor',
        this.productoProveedor
      );
      const productoProveedorObj: any = {
        idProductoProveedor: this.productoProveedor,
        precio: this.formulario.value.precio,
        idProducto: this.formulario.value.idProducto,
        idProveedor: this.idProveedor,
      };
      this.suscripcion.add(
        this.productoXproveedorService
          .postProductoProveedor(productoProveedorObj)
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
