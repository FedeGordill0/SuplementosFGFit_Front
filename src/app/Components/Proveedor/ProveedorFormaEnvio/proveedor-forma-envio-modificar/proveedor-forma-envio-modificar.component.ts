import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModificarComponent } from 'src/app/Components/Messages/FormaEnvio/modificar/modificar.component';
import { ErrorComponent } from 'src/app/Components/Messages/Error/error.component';
import { FormaEnvio } from 'src/app/Models/forma-envio';
import { ProveedorXformaEnvio } from 'src/app/Models/proveedor-xforma-envio';
import { FormaEnvioService } from 'src/app/Services/forma-envio.service';
import { ProveedorXformaEnvioService } from 'src/app/Services/proveedor-xenvio.service';

@Component({
  selector: 'app-proveedor-forma-envio-modificar',
  templateUrl: './proveedor-forma-envio-modificar.component.html',
  styleUrls: ['./proveedor-forma-envio-modificar.component.css'],
})
export class ProveedorFormaEnvioModificarComponent {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  listadoFormasEnvio: FormaEnvio[] = [];
  proveedorFormaEnvio: ProveedorXformaEnvio;
  idProveedor: any;
  idFormaEnvio: any;
  idProveedorFormaEnvioGuardar: any;
  constructor(
    private proveedorXformaEnvioService: ProveedorXformaEnvioService,
    private formaEnvioService: FormaEnvioService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.formulario = this.fb.group({
      idFormaEnvio: [[]],
      precio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarForm();
    this.suscripcion.add(
      this.formaEnvioService.getFormasEnvio().subscribe({
        next: (listado: any) => {
          this.listadoFormasEnvio = listado;

          this.activatedRoute.params.subscribe({
            next: (params) => {
              this.idFormaEnvio = params['idFormaEnvio'];
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
      this.proveedorFormaEnvio = this.formulario.value;

      const proveedorFormaEnvioObj: any = {
        idProveedorFormaEnvio: this.idProveedorFormaEnvioGuardar,
        precio: this.formulario.value.precio,
        idFormaEnvio: this.formulario.value.idFormaEnvio,
        idProveedor: this.idProveedor,
      };
      this.suscripcion.add(
        this.proveedorXformaEnvioService
          .putProveedorFormaEnvio(proveedorFormaEnvioObj)
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
      '/proveedor/formasEnvio/listado/' + this.idFormaEnvio,
    ]);
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
          const idFormaEnvio = params['idFormaEnvio'];
          if (idProveedor) {
            this.proveedorXformaEnvioService
              .getProveedorFormaEnvioID(idProveedor, idFormaEnvio)
              .subscribe({
                next: (p: any) => {
                  console.log(
                    ' this.productoXproveedorService.getProductoXProveedorID(id)',
                    p
                  );

                  this.idProveedorFormaEnvioGuardar =
                    p.resultado.idProveedorFormaEnvio;

                  this.formulario.patchValue({
                    idFormaEnvio: p.resultado.idFormaEnvio,
                    precio: [p.resultado.idFormaEnvioNavigation?.precio],
                    idProveedorFormaEnvio: [p.resultado.idProveedorFormaEnvio],
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
