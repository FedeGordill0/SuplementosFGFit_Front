import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AltaComponent } from 'src/app/Components/Messages/FormaEnvio/alta/alta.component';
import { ErrorComponent } from 'src/app/Components/Messages/Error/error.component';
import { ProveedorXformaEnvio } from 'src/app/Models/proveedor-xforma-envio';
import { FormaEnvioService } from 'src/app/Services/forma-envio.service';
import { ProveedorXformaEnvioService } from 'src/app/Services/proveedor-xenvio.service';

@Component({
  selector: 'app-proveedor-forma-envio-alta',
  templateUrl: './proveedor-forma-envio-alta.component.html',
  styleUrls: ['./proveedor-forma-envio-alta.component.css'],
})
export class ProveedorFormaEnvioAltaComponent {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  listadoFormasEnvio: any[] = [];
  proveedorFormaEnvio: ProveedorXformaEnvio;
  idProveedor: any;
  constructor(
    private proveedorXformaEnvioService: ProveedorXformaEnvioService,
    private formaEnvioService: FormaEnvioService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.formulario = this.fb.group({
      idFormaEnvio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.suscripcion.add(
      this.formaEnvioService.getFormasEnvio().subscribe({
        next: (listado: any) => {
          console.log('listadolistadolistadolistadolistado', listado);
          this.listadoFormasEnvio = listado;

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
      this.proveedorFormaEnvio = this.formulario.value;
      console.log(
        'this.productoProveedorthis.productoProveedor',
        this.proveedorFormaEnvio
      );
      const proveedorFormaEnvioObj: any = {
        idroveedorFormaEnvio: this.proveedorFormaEnvio,
        idFormaEnvio: this.formulario.value.idFormaEnvio,
        idProveedor: this.idProveedor,
      };
      this.suscripcion.add(
        this.proveedorXformaEnvioService
          .postProveedorFormaEnvio(proveedorFormaEnvioObj)
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
    this.router.navigate([
      '/proveedor/formasEnvio/listado/' + this.idProveedor,
    ]);
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
