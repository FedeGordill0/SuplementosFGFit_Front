import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { DetalleOrden } from 'src/app/Models/detalle-orden';
import { OrdenCompra } from 'src/app/Models/orden-compra';
import { Producto } from 'src/app/Models/producto';
import { ProductoXProveedor } from 'src/app/Models/producto-xproveedor';
import { Proveedor } from 'src/app/Models/proveedor';
import { ProveedorXformaEnvio } from 'src/app/Models/proveedor-xforma-envio';
import { ProveedorXFormaPago } from 'src/app/Models/proveedor-xforma-pago';
import { DetalleOrdenService } from 'src/app/Services/detalle-orden.service';
import { FormaEnvioService } from 'src/app/Services/forma-envio.service';
import { FormaPagoService } from 'src/app/Services/forma-pago.service';
import { OrdenCompraService } from 'src/app/Services/orden-compra.service';
import { ProveedorXformaEnvioService } from 'src/app/Services/proveedor-xenvio.service';
import { ProveedorService } from 'src/app/Services/proveedor.service';
import { AltaComponent } from '../../Messages/OrdenCompra/alta/alta.component';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
emailjs.init('2c_9IHda4Wwugmk7t');
@Component({
  selector: 'app-orden-compra-alta',
  templateUrl: './orden-compra-alta.component.html',
  styleUrls: ['./orden-compra-alta.component.css'],
})
export class OrdenCompraAltaComponent implements OnInit {
  private subscription = new Subscription();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  proveedores: any[] = [];
  productosXproveedores: any[] = [];
  proveedoresXformaEnvios: any[] = [];
  proveedoresXformaPagos: any[] = [];

  selectedProductos: any[] = [];
  selectedProducto: any;
  selectedProveedor: Proveedor[] = [];
  selectedProveedorFormasEnvio: any;
  selectedProveedorFormasPago: ProveedorXFormaPago[] = [];

  formasEnvio: any[] = [];
  listadoFormasEnvio: any[] = [];

  formasPago: any[] = [];
  listadoFormasPago: any[] = [];

  fechaRegistro = new Date();
  estadoOrden: string = 'Pendiente';
  ordenCompra: any;
  detalleOrden: any;
  idFormaEnvioOrdenCompra: any;
  idFormaPagoOrdenCompra: any;

  precioFormaEnvio: number = 0;
  precioFormaPago: number = 0;
  totalFP: number = 0;
  stepperOrientation: Observable<StepperOrientation>;
  constructor(
    private _formBuilder: FormBuilder,
    private proveedorService: ProveedorService,
    private ordenCompraService: OrdenCompraService,
    private detalleOrdenService: DetalleOrdenService,
    private router: Router,
    private _snack: MatSnackBar,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      proveedorControl: ['', Validators.required],
      formaEnvioControl: ['', Validators.required],
      formaPagoControl: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({ cantidad: [''] });

    this.thirdFormGroup = this._formBuilder.group({
      productosSeleccionados: [[]],

      totalCompra: [''],
    });

    this.subscription.add(
      this.proveedorService.getProveedores().subscribe((proveedores: any) => {
        this.proveedores = proveedores.filter((p: any) => {
          return p.estado;
        });
      })
    );
  }
  next() {
    // Llamar al método para actualizar las selecciones de formas de envío y pago
    this.updateSelectedProveedores();
    this.updateSelectedFormasEnvio();
    this.updateSelectedFormasPago();
  }
  cargarDatosProveedor() {
    const proveedorId = this.firstFormGroup.get('proveedorControl')?.value;
    if (proveedorId) {
      this.subscription.add(
        this.proveedorService
          .getProveedorID(proveedorId)
          .subscribe((datosProveedor: any) => {
            console.log('datosProveedor', datosProveedor);

            this.productosXproveedores = datosProveedor.productosXproveedores;
            this.proveedoresXformaEnvios =
              datosProveedor.proveedoresXformaEnvios;
            this.proveedoresXformaPagos = datosProveedor.proveedoresXformaPagos;

            // Inicializa las cantidades en 0
            this.productosXproveedores.forEach((producto) => {
              producto.cantidad = 0;
            });

            // Actualiza las selecciones
            this.updateSelectedProveedores();
          })
      );
    }
  }

  toggleProductoSelection(producto: any) {
    producto.isSelected = !producto.isSelected;
    // Asigna el producto seleccionado
    if (producto.isSelected) {
      this.selectedProductos = [producto.idProductoNavigation];
    }
    console.log(
      ' toggleProductoSelectionselectedProductos',
      this.selectedProductos
    );
    this.updateSelectedProductos();
  }

  updateSelectedFormasEnvio() {
    const formaEnvioId = this.firstFormGroup.get('formaEnvioControl')?.value;

    // Busca la forma de envío seleccionada en el listadoFormasEnvio
    const proveedorFormaEnvioSeleccionada = this.proveedoresXformaEnvios.find(
      (f) => f.idProveedorFormaEnvio === formaEnvioId
    );
    console.log(
      'proveedorFormaEnvioSeleccionadaaaaaaaaaaaaaaa',
      proveedorFormaEnvioSeleccionada
    );
    if (proveedorFormaEnvioSeleccionada) {
      this.selectedProveedorFormasEnvio = [proveedorFormaEnvioSeleccionada];
      this.precioFormaEnvio =
        proveedorFormaEnvioSeleccionada.idFormaEnvioNavigation?.precio || 0;
      console.log('precioFormaEnviooooooooooo', this.precioFormaEnvio);

      this.selectedProveedorFormasEnvio.forEach((proveedorFormaEnvio: any) => {
        this.idFormaEnvioOrdenCompra = proveedorFormaEnvio.idFormaEnvio;
      });
    } else {
      this.selectedProveedorFormasEnvio = [];
      this.precioFormaEnvio = 0;
    }
  }

  updateSelectedFormasPago() {
    const formaPagoId = this.firstFormGroup.get('formaPagoControl')?.value;

    // Busca la forma de envío seleccionada en el listadoFormasEnvio
    const proveedorFormaPagoSeleccionada = this.proveedoresXformaPagos.find(
      (f) => f.idProveedorFormaPago === formaPagoId
    );

    if (proveedorFormaPagoSeleccionada) {
      this.selectedProveedorFormasPago = [proveedorFormaPagoSeleccionada];
      this.precioFormaPago =
        proveedorFormaPagoSeleccionada.idFormaPagoNavigation?.porcentaje || 0;
      console.log('precioFormaPago', this.precioFormaPago);
      this.selectedProveedorFormasPago.forEach((proveedorFormaPago: any) => {
        this.idFormaPagoOrdenCompra = proveedorFormaPago.idFormaPago;
      });
    } else {
      this.selectedProveedorFormasPago = [];
    }
  }

  updateSelectedProveedores() {
    const proveedorId = this.firstFormGroup.get('proveedorControl')?.value;
    console.log('proveedorId', proveedorId);

    // Buscar el proveedor correspondiente en la lista de proveedores
    const proveedorSeleccionado = this.proveedores.find(
      (proveedor: any) => proveedor.idProveedor === proveedorId
    );
    console.log('proveedorSeleccionado', proveedorSeleccionado);
    if (proveedorSeleccionado) {
      this.selectedProveedor = [proveedorSeleccionado];
    } else {
      this.selectedProveedor = [];
    }
  }

  updateSelectedProductos() {
    this.selectedProductos = this.productosXproveedores.filter(
      (producto) => producto.isSelected
    );
    console.log('updateSelectedProductos', this.selectedProductos);

    for (const iterator of this.selectedProductos) {
      console.log(
        'updateSelectedProductoscate',
        iterator.idProductoNavigation?.idCategoriaNavigation?.precio
      );
    }
    this.calculateTotal();
  }

  calculateTotal() {
    // detalle.idOrdenCompraNavigation?.idFormaEnvioNavigation?.precio
    const total = this.selectedProductos.reduce(
      (acc, producto: DetalleOrden) =>
        acc + producto.precio * producto.cantidad,
      0
    );
    const totalllll = total + this.precioFormaEnvio;
    this.totalFP = totalllll + (totalllll * this.precioFormaPago) / 100;
    console.log('this.totalFP', this.totalFP);
    this.thirdFormGroup.get('totalCompra')?.setValue(this.totalFP);
    this.thirdFormGroup
      .get('productosSeleccionados')
      ?.setValue(this.selectedProductos);
  }

  generarOrden() {
    this.ordenCompra = {};
    this.ordenCompra.fechaRegistro = this.fechaRegistro;
    const idFormaEnvio = this.idFormaEnvioOrdenCompra;
    const idFormaPago = this.idFormaPagoOrdenCompra;
    const idProveedor = this.firstFormGroup.get('proveedorControl')?.value;
    this.ordenCompra.idFormaEnvio = idFormaEnvio;
    this.ordenCompra.idFormaPago = idFormaPago;
    this.ordenCompra.idProveedor = idProveedor;
    console.log('ordenCompra', this.ordenCompra);
    // Cada orden de compra se crea con su ID asociado
    this.ordenCompraService.postOrdenCompra(this.ordenCompra).subscribe({
      next: (or: any) => {
        console.log('or', or);
        console.log('or', or.resultado.idOrdenCompra);

        this.detalleOrden = {};
        // Paso 2: Iterar a través de los productos seleccionados y crear un detalle de orden para cada producto
        console.log('selectedProductos', this.selectedProductos);
        this.selectedProductos.forEach((productoSeleccionado: any) => {
          const detalleOrden: any = {
            cantidad: this.secondFormGroup.get('cantidad')?.value,
            precio: this.totalFP,
            idOrdenCompra: or.resultado.idOrdenCompra,
            idProducto: productoSeleccionado.idProducto,
          };

          // Llamar al método en tu servicio para crear el detalle de orden en el servidor
          this.detalleOrdenService
            .postDetalleOrden(detalleOrden)
            .subscribe((detalleCreado: any) => {
              console.log(
                'Detalle de orden de compra creado para producto',
                detalleCreado
              );
            });
        });
        this.router.navigate(['dashboard']);

        if (this.ordenCompra.idFormaPago === 3) {
          this.mercadoPago();
        }
        this.enviarEmail();
        this.openSnackBarSuccess();
      },
      error: () => {
        alert('ERROR ordenCompraService.postOrdenCompra');
      },
    });
  }
  openSnackBarSuccess() {
    this._snack.openFromComponent(AltaComponent, {
      duration: 1 * 1500,
    });
  }
  mercadoPago() {
    const urlMercadoPago = 'https://link.mercadopago.com.ar/fgfit';

    // Abre la URL en una nueva pestaña o ventana
    window.open(urlMercadoPago, '_blank');
  }

  async enviarEmail() {
    try {
      const response = await emailjs.send(
        'service_7r3m5ch',
        'template_3w8cdg2',
        {
          from_name: 'Suplementos Fg-Fit',
          reply_to: 'Comprador',
        },
        '2c_9IHda4Wwugmk7t'
      );

      console.log('Email enviado con éxito:', response);
      // Puedes agregar lógica adicional aquí según tu necesidad
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      // Puedes manejar el error de alguna manera, como mostrar un mensaje al usuario
    }
  }
  inicio() {
    this.router.navigate(['dashboard']);
  }
}
