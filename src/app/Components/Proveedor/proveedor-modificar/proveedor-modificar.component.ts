import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Proveedor } from 'src/app/Models/proveedor';
import { ProveedorService } from 'src/app/Services/proveedor.service';
import { ModificarComponent } from '../../Messages/Proveedor/modificar/modificar.component';
import { ErrorComponent } from '../../Messages/Error/error.component';
import { FormaEnvio } from 'src/app/Models/forma-envio';
import { FormaPago } from 'src/app/Models/forma-pago';
import { Producto } from 'src/app/Models/producto';
import { FormaEnvioService } from 'src/app/Services/forma-envio.service';
import { FormaPagoService } from 'src/app/Services/forma-pago.service';
import { ProductoService } from 'src/app/Services/producto.service';
import { AltaComponent } from '../../Messages/Categoria/alta/alta.component';
import { ProductoXProveedor } from 'src/app/Models/producto-xproveedor';
import { ProveedorXformaEnvio } from 'src/app/Models/proveedor-xforma-envio';
import { ProveedorXFormaPago } from 'src/app/Models/proveedor-xforma-pago';
import { ProveedorXformaEnvioService } from 'src/app/Services/proveedor-xenvio.service';
import { ProveedorXFormaPagoService } from 'src/app/Services/proveedor-xforma-pago.service';

@Component({
  selector: 'app-proveedor-modificar',
  templateUrl: './proveedor-modificar.component.html',
  styleUrls: ['./proveedor-modificar.component.css'],
})
export class ProveedorModificarComponent {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  proveedor: any;
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
  proveedoresXformaEnviosFormArray: FormArray;
  proveedoresXformaPagosFormArray: FormArray;
  productosXproveedores: ProductoXProveedor[] = [];
  proveedoresXformaEnvios: ProveedorXformaEnvio[] = [];
  proveedoresXformaPagos: ProveedorXFormaPago[] = [];

  proveedoresXformaEnvioID: any;
  proveedorxFormaEnvioObj: any;

  proveedoresXformaPagoID: any;
  proveedorxFormaPagoObj: any;
  constructor(
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private formaEnvioService: FormaEnvioService,
    private formaPagoService: FormaPagoService,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private proveedorxFormaEnvioService: ProveedorXformaEnvioService,
    private proveedorxFormaPagoService: ProveedorXFormaPagoService
  ) {
    this.formulario = this.fb.group({
      idProveedor: [''],
      nombre: ['', Validators.required],
      cuit: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      proveedoresXformaEnvios: [[]],
      proveedoresXformaPagos: [[]],
      productosXproveedores: [[]],
      productosPrecios: this.fb.array([]),
    });
    this.precios = this.formulario.get('productosPrecios') as FormArray;
    this.proveedoresXformaEnviosFormArray = this.formulario.get(
      'proveedoresXformaEnvios'
    ) as FormArray;
    this.proveedoresXformaPagosFormArray = this.formulario.get(
      'proveedoresXformaPagos'
    ) as FormArray;
  }

  async ngOnInit(): Promise<void> {
    await this.mostrarForm();
    this.formulario
      .get('productosXproveedores')
      ?.valueChanges.subscribe((productosXproveedores: number[]) => {
        const precios = this.formulario.get('productosPrecios') as FormArray;

        while (precios.length !== 0) {
          precios.removeAt(0);
        }
        if (Array.isArray(productosXproveedores)) {
          productosXproveedores.forEach((productoId: number) => {
            const producto = this.listadoProductos.find(
              (p) => p.idProducto === productoId
            );
            if (producto) {
              const productoXProveedor =
                this.proveedor.productosXproveedores.find(
                  (productoProveedor: any) =>
                    productoProveedor.idProducto === productoId
                );
              if (productoXProveedor) {
                this.agregarPrecioProducto(productoXProveedor);
              }
            }
          });
        }
        this.cd.detectChanges();
      });

    this.suscripcion.add(
      this.productoService.getProductos().subscribe({
        next: (listado: any) => {
          this.listadoProductos = listado;
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

      const productosPrecios =
        this.formulario.get('productosPrecios')?.value || [];
      const formaEnvio = this.formulario.get('proveedoresXformaEnvios')?.value;

      const formaPago =
        this.formulario.get('proveedoresXformaPagos')?.value || [];

      console.log(
        'formaEnvioformaEnvioformaEnvioformaEnvioformaEnvioformaEnvioformaEnvioformaEnvio',
        formaEnvio
      );

      this.suscripcion.add(
        this.proveedorService.putProveedor(this.proveedor).subscribe({
          next: (p: any) => {
            console.log('this.proveedorthis.proveedor', this.proveedor);
            console.log('pppppp', p);

            const idProveedorFormaEnvio = Number(this.proveedoresXformaEnvioID);

            const idFormaEnvio = Number(formaEnvio);

            this.proveedorxFormaEnvioObj = {
              idProveedorFormaEnvio: idProveedorFormaEnvio,
              idProveedor: this.proveedor.idProveedor,
              idFormaEnvio: idFormaEnvio,
            };

            const idProveedorFormaPago = Number(this.proveedoresXformaPagoID);

            const idFormaPago = Number(formaPago);

            this.proveedorxFormaPagoObj = {
              idProveedorFormaPago: idProveedorFormaPago,
              idProveedor: this.proveedor.idProveedor,
              idFormaPago: idFormaPago,
            };

            this.proveedorxFormaEnvioService
              .putProveedorFormaEnvio(this.proveedorxFormaEnvioObj)
              .subscribe({
                next: () => {},

                error: () => {
                  alert(
                    'this.proveedorxFormaEnvioService.putProveedorFormaEnvio'
                  );
                },
              });
            this.proveedorxFormaPagoService
              .putProveedorFormaPago(this.proveedorxFormaPagoObj)
              .subscribe({
                next: () => {},

                error: () => {
                  alert(
                    'this.proveedorxFormaEnvioService.putProveedorFormaEnvio'
                  );
                },
              });

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

  // ...

  cancelar() {
    this.router.navigate(['proveedor/listado']);
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

  isProductoSelected(productoId: number): boolean {
    const productosXproveedores = this.formulario.get(
      'productosXproveedores'
    )?.value;
    return productosXproveedores.includes(productoId);
  }
  mostrarForm() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const id = params['id'];
        console.log('id', id);
        if (id) {
          this.proveedorService.getProveedorID(id).subscribe({
            next: (p: any) => {
              if (p) {
                this.proveedor = p;
                console.log(
                  'this.proveedorthis.proveedorthis.proveedor',
                  this.proveedor
                );

                this.productosXproveedores =
                  this.proveedor.productosXproveedores.map(
                    (producto: Producto) => producto.idProducto
                  );

                const precios = this.formulario.get(
                  'productosPrecios'
                ) as FormArray;
                precios.clear();

                this.proveedoresXformaEnvios =
                  this.proveedor.proveedoresXformaEnvios.map(
                    (formaEnvio: any) => formaEnvio.idFormaEnvio
                  );
                this.proveedoresXformaEnvioID =
                  this.proveedor.proveedoresXformaEnvios.map(
                    (formaEnvio: any) => formaEnvio.idProveedorFormaEnvio
                  );
                console.log(
                  'this.proveedoresXformaEnviosAccedo al id de la forma de envioAccedo al id de la forma de envio',
                  this.proveedoresXformaEnvios
                );

                this.proveedoresXformaPagos =
                  this.proveedor.proveedoresXformaPagos.map(
                    (formaPago: any) => formaPago.idFormaPago
                  );
                this.proveedoresXformaPagoID =
                  this.proveedor.proveedoresXformaPagos.map(
                    (formaPago: any) => formaPago.idProveedorFormaPago
                  );
                this.formulario.patchValue({
                  // this.formulario = this.fb.group({
                  idProveedor: this.proveedor.idProveedor,
                  nombre: this.proveedor.nombre,
                  cuit: this.proveedor.cuit,
                  direccion: this.proveedor.direccion,
                  email: this.proveedor.email,
                  telefono: this.proveedor.telefono,
                  productosXproveedores: this.productosXproveedores,
                  proveedoresXformaEnvios: this.proveedoresXformaEnvios,
                  proveedoresXformaPagos: this.proveedoresXformaPagos,
                  productosPrecios: this.fb.array([]),
                });
              } else {
                console.log('Proveedor no encontrado');
              }
            },
            error: () => {
              alert('ERROR proveedorService.getProveedorID');
            },
          });
        }
      },
      error: () => {
        alert('ERROR activatedRoute.params');
      },
    });
  }

  agregarPrecioProducto(productoXProveedor: ProductoXProveedor) {
    const precios = this.formulario.get('productosPrecios') as FormArray;

    const index = precios.controls.findIndex((control: any) => {
      const idProducto = control.get('idProducto')?.value;
      return idProducto === productoXProveedor.idProducto;
    });

    if (index !== -1) {
      precios.removeAt(index);
    }

    precios.push(
      this.fb.group({
        idProducto: [productoXProveedor.idProducto],
        precio: [productoXProveedor.precio, Validators.required],
      })
    );
  }
}
