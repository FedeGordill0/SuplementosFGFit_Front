import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Proveedor } from 'src/app/Models/proveedor';
import { ProveedorService } from 'src/app/Services/proveedor.service';
import { AltaComponent } from '../../Messages/Proveedor/alta/alta.component';
import { ErrorComponent } from '../../Messages/Error/error.component';
import { Producto } from 'src/app/Models/producto';
import { ProductoService } from 'src/app/Services/producto.service';
import { FormaEnvioService } from 'src/app/Services/forma-envio.service';
import { FormaEnvio } from 'src/app/Models/forma-envio';
import { FormaPagoService } from 'src/app/Services/forma-pago.service';
import { FormaPago } from 'src/app/Models/forma-pago';

@Component({
  selector: 'app-proveedor-alta',
  templateUrl: './proveedor-alta.component.html',
  styleUrls: ['./proveedor-alta.component.css'],
})
export class ProveedorAltaComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  proveedor: Proveedor;
  listadoProductos: Producto[] = [];
  listadoFormasEnvio: FormaEnvio[] = [];
  listadoFormasPago: FormaPago[] = [];
  validarNombre: any;
  validarDireccion: any;
  validarTelefono: any;
  validarCuit: any;
  validarEmail: any;
  validarTelefono2: any;
  validarCuit2: any;
  validarPrecio: any;
  precios: FormArray;
  constructor(
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private formaEnvioService: FormaEnvioService,
    private formaPagoService: FormaPagoService,
    private cd: ChangeDetectorRef
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      cuit: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      formasEnvioIds: [[]],
      formasPagoIds: [[]],
      productosIds: [[]],
      productosPrecios: this.fb.array([]),
    });
    this.precios = this.formulario.get('productosPrecios') as FormArray;
  }

  ngOnInit(): void {
    this.formulario
      .get('productosIds')
      ?.valueChanges.subscribe((productosIds: any) => {
        const precios = this.formulario.get('productosPrecios') as FormArray;

        while (precios.length !== 0) {
          precios.removeAt(0);
        }

        productosIds.forEach((productoId: number) => {
          const producto = this.listadoProductos.find(
            (p) => p.idProducto === productoId
          );
          if (producto) {
            this.agregarPrecioProducto(producto);
          }
        });

        this.cd.detectChanges();
      });

    this.suscripcion.add(
      this.productoService.getProductos().subscribe({
        next: (listado: any) => {
          this.listadoProductos = listado;

          // this.listadoProductos.forEach((producto) => {
          //   this.agregarPrecioProducto(producto);
          // });
        },
        error: () => {
          alert('ERROR ERROR');
        },
      })
    );
    this.suscripcion.add(
      this.formaEnvioService.getFormasEnvio().subscribe({
        next: (listado: any) => {
          this.listadoFormasEnvio = listado;
        },
        error: () => {
          alert('ERROR ERROR');
        },
      })
    );
    this.suscripcion.add(
      this.formaPagoService.getFormasPago().subscribe({
        next: (listado: any) => {
          this.listadoFormasPago = listado;
        },
        error: () => {
          alert('ERROR ERROR');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  guardar() {
    if (this.formulario.valid) {
      this.proveedor = this.formulario.value;

      const productosPrecios = this.formulario.get('productosPrecios')?.value;

      this.proveedor.productosIds = productosPrecios.map(
        (productoPrecio: any) => ({
          idProducto: productoPrecio.productoId,
          precio: productoPrecio.precio,
        })
      );

      this.suscripcion.add(
        this.proveedorService.postProveedor(this.proveedor).subscribe({
          next: () => {
            this.openSnackBarSuccess();
            this.router.navigate(['proveedor/listado']);
          },
          error: () => {
            this.validarNombre = false;
            this.validarDireccion = false;
            this.validarTelefono = false;
            this.validarTelefono2 = false;
            this.validarEmail = false;
            this.validarCuit = false;
            this.validarCuit2 = false;
            this.validarPrecio = false;

            if (this.formulario.value.nombre.length > 50) {
              this.validarNombre = true;
            }
            if (this.formulario.value.telefono.length > 50) {
              this.validarTelefono = true;
            } else if (typeof this.formulario.value.telefono === 'string') {
              this.validarTelefono2 = true;
            }
            if (this.formulario.value.direccion.length > 50) {
              this.validarDireccion = true;
            }
            if (this.formulario.value.email.length > 100) {
              this.validarEmail = true;
            }
            if (this.formulario.value.cuit.length > 100) {
              this.validarCuit = true;
            } else if (typeof this.formulario.value.cuit === 'string') {
              this.validarCuit2 = true;
            }
            if (typeof this.formulario.value.precio === 'string') {
              this.validarPrecio = true;
            }
          },
        })
      );
    } else {
      this.openSnackBarError();
    }
  }

  cancelar() {
    this.router.navigate(['proveedor/listado']);
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
  agregarPrecioProducto(producto: Producto) {
    const precios = this.formulario.get('productosPrecios') as FormArray;

    precios.push(
      this.fb.group({
        productoId: producto.idProducto,
        precio: [null, Validators.required],
      })
    );
  }
  isProductoSelected(productoId: number): boolean {
    const productosIds = this.formulario.get('productosIds')?.value;
    return productosIds.includes(productoId);
  }
}
