import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModificarComponent } from 'src/app/Components/Messages/FormaPago/modificar/modificar.component';
import { ErrorComponent } from 'src/app/Components/Messages/Error/error.component';
import { FormaPago } from 'src/app/Models/forma-pago';
import { ProveedorXFormaPago } from 'src/app/Models/proveedor-xforma-pago';
import { FormaPagoService } from 'src/app/Services/forma-pago.service';
import { ProveedorXFormaPagoService } from 'src/app/Services/proveedor-xforma-pago.service';

@Component({
  selector: 'app-proveedor-forma-pago-modificar',
  templateUrl: './proveedor-forma-pago-modificar.component.html',
  styleUrls: ['./proveedor-forma-pago-modificar.component.css'],
})
export class ProveedorFormaPagoModificarComponent {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  listadoFormasPago: FormaPago[] = [];
  proveedorFormaPago: ProveedorXFormaPago;
  idProveedor: any;
  idFormaPago: any;
  idProveedorFormaPagoGuardar: any;
  constructor(
    private proveedorXFormaPagoService: ProveedorXFormaPagoService,
    private formaPagoService: FormaPagoService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.formulario = this.fb.group({
      idFormaPago: [[]],
      porcentaje: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarForm();
    this.suscripcion.add(
      this.formaPagoService.getFormasPago().subscribe({
        next: (listado: any) => {
          this.listadoFormasPago = listado;

          this.activatedRoute.params.subscribe({
            next: (params) => {
              this.idFormaPago = params['idFormaPago'];
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
      this.proveedorFormaPago = this.formulario.value;

      const proveedorFormaPagoObj: any = {
        idProveedorFormaPago: this.idProveedorFormaPagoGuardar,
        porcentaje: this.formulario.value.porcentaje,
        idFormaPago: this.formulario.value.idFormaPago,
        idProveedor: this.idProveedor,
      };
      this.suscripcion.add(
        this.proveedorXFormaPagoService
          .putProveedorFormaPago(proveedorFormaPagoObj)
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
    this.router.navigate(['/proveedor/formasPago/listado/' + this.idFormaPago]);
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
          const idFormaPago = params['idFormaPago'];
          if (idProveedor) {
            this.proveedorXFormaPagoService
              .getProveedorFormaPagoID(idProveedor, idFormaPago)
              .subscribe({
                next: (p: any) => {
                  console.log(
                    ' this.productoXproveedorService.getProductoXProveedorID(id)',
                    p
                  );

                  this.idProveedorFormaPagoGuardar =
                    p.resultado.idProveedorFormaPago;

                  this.formulario.patchValue({
                    idFormaPago: p.resultado.idFormaPago,
                    porcentaje: [
                      p.resultado.idFormaEnvioNavigation?.porcentaje,
                    ],
                    idProveedorFormaPago: [p.resultado.idProveedorFormaPago],
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
