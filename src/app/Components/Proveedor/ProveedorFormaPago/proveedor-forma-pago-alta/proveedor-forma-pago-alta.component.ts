import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AltaComponent } from 'src/app/Components/Messages/Categoria/alta/alta.component';
import { ErrorComponent } from 'src/app/Components/Messages/Error/error.component';
import { ProveedorXFormaPago } from 'src/app/Models/proveedor-xforma-pago';
import { FormaPagoService } from 'src/app/Services/forma-pago.service';
import { ProveedorXFormaPagoService } from 'src/app/Services/proveedor-xforma-pago.service';

@Component({
  selector: 'app-proveedor-forma-pago-alta',
  templateUrl: './proveedor-forma-pago-alta.component.html',
  styleUrls: ['./proveedor-forma-pago-alta.component.css'],
})
export class ProveedorFormaPagoAltaComponent {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  listadoFormasPago: any[] = [];
  proveedorFormaPago: ProveedorXFormaPago;
  idProveedor: any;
  constructor(
    private proveedorXFormaPagoService: ProveedorXFormaPagoService,
    private formaPagoService: FormaPagoService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.formulario = this.fb.group({
      idFormaPago: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.suscripcion.add(
      this.formaPagoService.getFormasPago().subscribe({
        next: (listado: any) => {
          console.log('listadolistadolistadolistadolistado', listado);
          this.listadoFormasPago = listado;

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
      this.proveedorFormaPago = this.formulario.value;
      console.log(
        'this.productoProveedorthis.productoProveedor',
        this.proveedorFormaPago
      );
      const proveedorFormaPagoObj: any = {
        idroveedorFormaPago: this.proveedorFormaPago,
        idFormaPago: this.formulario.value.idFormaPago,
        idProveedor: this.idProveedor,
      };
      this.suscripcion.add(
        this.proveedorXFormaPagoService
          .postProveedorFormaPago(proveedorFormaPagoObj)
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
    this.router.navigate(['/proveedor/formasPago/listado/' + this.idProveedor]);
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
